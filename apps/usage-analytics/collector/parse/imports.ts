import _traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import type {
  ImportDeclaration,
  ExportNamedDeclaration,
  VariableDeclarator,
  MemberExpression,
} from '@babel/types';
import type { PackageType } from '../config.ts';
import { parseModule } from './ast.ts';

// @babel/traverse ships CJS; under ESM/tsx the callable lives on `.default`.
const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as { default: typeof _traverse }).default
) as typeof _traverse;

/** Per-package usage extracted from a single file. */
export interface FilePackageUsage {
  /** Number of import / require / dynamic-import statements referencing the package. */
  importStatements: number;
  /** canonical symbol name -> reference count within this file. */
  symbols: Record<string, number>;
}

export type FileUsage = Map<string, FilePackageUsage>;

export interface PackageMeta {
  type: PackageType;
  /** Allow-list of exported symbol names; empty means "accept anything". */
  symbols: Set<string>;
}

export interface AnalyzeContext {
  /** package name -> metadata (type + allow-list). */
  packages: Map<string, PackageMeta>;
}

/** A local binding introduced by importing from a tracked package. */
interface Binding {
  pkg: string;
  /** Named import: the canonical exported name. Namespace/default: undefined. */
  canonical?: string;
  /** True for `import * as x` / `import x from` / `const x = require(...)`. */
  namespace: boolean;
}

/**
 * Resolve an import source to a tracked package, handling deep imports like
 * `@utilitywarehouse/hearth-tokens/js` or `…/hearth-react-icons/lib/AddMediumIcon`.
 * The trailing-slash guard prevents `hearth-react` from swallowing
 * `hearth-react-native` / `hearth-react-icons`.
 */
function resolvePackage(source: string, tracked: Map<string, PackageMeta>): string | undefined {
  if (tracked.has(source)) return source;
  for (const name of tracked.keys()) {
    if (source.startsWith(name + '/')) return name;
  }
  return undefined;
}

function ensure(usage: FileUsage, pkg: string): FilePackageUsage {
  let u = usage.get(pkg);
  if (!u) {
    u = { importStatements: 0, symbols: {} };
    usage.set(pkg, u);
  }
  return u;
}

function bump(usage: FilePackageUsage, symbol: string, by = 1) {
  usage.symbols[symbol] = (usage.symbols[symbol] ?? 0) + by;
}

/**
 * Resolve the token "group" from a member-expression chain rooted at a token
 * binding, e.g. `color.blue[500]` -> `color.blue`, `tokens.space[3]` (namespace
 * import) -> `space`. Group granularity is the reliable unit for tokens.
 */
function tokenGroup(root: NodePath<MemberExpression>, namespace: boolean, canonical?: string): string | null {
  // Walk up to the outermost member expression to read the first two segments.
  const path: string[] = [];
  const obj = root.node.object;
  // The immediate property after the binding.
  const prop = root.node.property;
  const propName =
    !root.node.computed && prop.type === 'Identifier'
      ? prop.name
      : prop.type === 'StringLiteral'
        ? prop.value
        : null;
  if (obj.type !== 'Identifier') return null;
  if (namespace) {
    // binding is a namespace (e.g. `tokens`): group root is the property (`color`),
    // and the next segment (if a member of this member) is the sub-group.
    if (!propName) return null;
    path.push(propName);
    const parent = root.parentPath;
    if (parent?.isMemberExpression() && !parent.node.computed && parent.node.property.type === 'Identifier') {
      path.push(parent.node.property.name);
    }
    return path.join('.');
  }
  // binding is a named token namespace (e.g. `color`): group root is the canonical
  // name, sub-group is the property (`blue`).
  const base = canonical ?? (obj as { name: string }).name;
  path.push(base);
  if (propName) path.push(propName);
  return path.join('.');
}

/**
 * Analyze one source file and return its hearth usage. `code` should already
 * have passed a cheap substring prefilter for `@utilitywarehouse/hearth`.
 */
export function analyzeFile(code: string, ctx: AnalyzeContext): FileUsage {
  const usage: FileUsage = new Map();
  const ast = parseModule(code);
  if (!ast) return usage;

  const tracked = ctx.packages;
  const bindings = new Map<string, Binding>();

  const recordImportSpecifier = (pkg: string, local: string, canonical: string | undefined, namespace: boolean) => {
    bindings.set(local, { pkg, canonical, namespace });
  };

  traverse(ast, {
    ImportDeclaration(path: NodePath<ImportDeclaration>) {
      const pkg = resolvePackage(path.node.source.value, tracked);
      if (!pkg) return;
      const u = ensure(usage, pkg);
      u.importStatements += 1;

      for (const spec of path.node.specifiers) {
        const local = spec.local.name;
        if (spec.type === 'ImportSpecifier') {
          const imported = spec.imported;
          const canonical = imported.type === 'Identifier' ? imported.name : imported.value;
          recordImportSpecifier(pkg, local, canonical, false);
        } else if (spec.type === 'ImportNamespaceSpecifier' || spec.type === 'ImportDefaultSpecifier') {
          // `import * as x` or `import x from` — treat as namespace binding so we
          // can resolve member access (the common shape for token default imports).
          recordImportSpecifier(pkg, local, undefined, true);
        }
      }
    },

    // Re-exports: `export { Button } from '@utilitywarehouse/hearth-react'`
    ExportNamedDeclaration(path: NodePath<ExportNamedDeclaration>) {
      const src = path.node.source?.value;
      if (!src) return;
      const pkg = resolvePackage(src, tracked);
      if (!pkg) return;
      const meta = tracked.get(pkg)!;
      const u = ensure(usage, pkg);
      u.importStatements += 1;
      for (const spec of path.node.specifiers) {
        if (spec.type === 'ExportSpecifier') {
          const local = spec.local;
          const canonical = local.name;
          if (meta.symbols.size === 0 || meta.symbols.has(canonical)) bump(u, canonical);
        }
      }
    },

    // `const { Button } = require('…')` / `const x = require('…')`
    VariableDeclarator(path: NodePath<VariableDeclarator>) {
      const init = path.node.init;
      if (!init || init.type !== 'CallExpression') return;
      if (init.callee.type !== 'Identifier' || init.callee.name !== 'require') return;
      const arg = init.arguments[0];
      if (!arg || arg.type !== 'StringLiteral') return;
      const pkg = resolvePackage(arg.value, tracked);
      if (!pkg) return;
      const u = ensure(usage, pkg);
      u.importStatements += 1;
      if (path.node.id.type === 'ObjectPattern') {
        for (const prop of path.node.id.properties) {
          if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
            const canonical = prop.key.name;
            const localName = prop.value.type === 'Identifier' ? prop.value.name : canonical;
            recordImportSpecifier(pkg, localName, canonical, false);
          }
        }
      } else if (path.node.id.type === 'Identifier') {
        recordImportSpecifier(pkg, path.node.id.name, undefined, true);
      }
    },

    // Dynamic import: `import('…')` — record the statement, symbols unresolved.
    CallExpression(path) {
      if (path.node.callee.type !== 'Import') return;
      const arg = path.node.arguments[0];
      if (!arg || arg.type !== 'StringLiteral') return;
      const pkg = resolvePackage(arg.value, tracked);
      if (!pkg) return;
      ensure(usage, pkg).importStatements += 1;
    },
  });

  // Second pass: count references to each binding via scope, at the right
  // granularity for the package type.
  const program = ast.program;
  void program;
  traverse(ast, {
    Program(path) {
      for (const [local, binding] of bindings) {
        const meta = tracked.get(binding.pkg);
        if (!meta) continue;
        const u = ensure(usage, binding.pkg);
        const scopeBinding = path.scope.getBinding(local);
        const refs = scopeBinding?.referencePaths ?? [];

        if (meta.type === 'tokens') {
          // Group-granularity: bucket each reference by its member-access group.
          for (const ref of refs) {
            const parent = ref.parentPath;
            if (parent?.isMemberExpression() && parent.node.object === ref.node) {
              const group = tokenGroup(parent as NodePath<MemberExpression>, binding.namespace, binding.canonical);
              if (group && (meta.symbols.size === 0 || meta.symbols.has(group.split('.')[0]!))) {
                bump(u, group);
              }
            } else if (binding.canonical && (meta.symbols.size === 0 || meta.symbols.has(binding.canonical))) {
              // Bare reference to a named token namespace.
              bump(u, binding.canonical);
            }
          }
          // The import itself counts as one reference to the named group.
          if (binding.canonical && (meta.symbols.size === 0 || meta.symbols.has(binding.canonical))) {
            bump(u, binding.canonical);
          }
        } else if (binding.canonical) {
          // component-lib / icons: count import + every reference (incl. JSX).
          if (meta.symbols.size === 0 || meta.symbols.has(binding.canonical)) {
            bump(u, binding.canonical, refs.length + 1);
          }
        }
      }
      path.stop();
    },
  });

  return usage;
}
