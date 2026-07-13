import fs from 'node:fs';
import path from 'node:path';
import { DISCOVERY_TERMS, IGNORED_DIRS, MAX_FILE_BYTES, SOURCE_EXTENSIONS } from '../config.ts';
import { analyzeFile, type AnalyzeContext, type PackageMeta } from './imports.ts';
import { collectDeclaredVersions } from './versions.ts';

/** Usage of a single symbol, aggregated across a repo's files. */
export interface RepoSymbolResult {
  /** Distinct files in this repo that reference the symbol. */
  fileCount: number;
  refCount: number;
  /** prop name -> times passed to this symbol across the repo. component-lib only. */
  props?: Record<string, number>;
}

/** What a single repo uses of a single package, aggregated across its files. */
export interface RepoPackageResult {
  fileCount: number;
  refCount: number;
  symbols: Record<string, RepoSymbolResult>;
}

export interface RepoParseResult {
  packages: Record<string, RepoPackageResult>;
  filesScanned: number;
  filesParsed: number;
  /**
   * package name -> (declared semver range -> number of `package.json` files
   * in this repo declaring it that way). Populated from every `package.json`
   * in the repo (root + nested workspace packages), independent of whether
   * the package is actually imported anywhere.
   */
  versions: Record<string, Record<string, number>>;
}

/**
 * Cheap substring gate — only files mentioning a tracked package (hearth or a
 * legacy predecessor) are worth parsing. Legacy package names don't share a
 * common substring with "hearth", so this checks each individually.
 */
function mentionsTrackedPackage(code: string): boolean {
  return DISCOVERY_TERMS.some(term => code.includes(term));
}

interface WalkEntry {
  path: string;
  kind: 'source' | 'package-json';
}

/** Single filesystem pass yielding both source files and `package.json` files (root + nested workspaces). */
function* walkFiles(dir: string): Generator<WalkEntry> {
  let entries: Array<fs.Dirent>;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      yield* walkFiles(full);
    } else if (entry.isFile()) {
      if (entry.name === 'package.json') yield { path: full, kind: 'package-json' };
      else if (SOURCE_EXTENSIONS.includes(path.extname(entry.name)))
        yield { path: full, kind: 'source' };
    }
  }
}

/**
 * Walk a checked-out repo directory and aggregate hearth usage across all of
 * its source files. `ctx` carries the tracked packages + allow-lists.
 */
export function walkRepo(rootDir: string, ctx: AnalyzeContext): RepoParseResult {
  const result: RepoParseResult = { packages: {}, filesScanned: 0, filesParsed: 0, versions: {} };
  const trackedNames = new Set(ctx.packages.keys());

  for (const entry of walkFiles(rootDir)) {
    if (entry.kind === 'package-json') {
      let code: string;
      try {
        code = fs.readFileSync(entry.path, 'utf8');
      } catch {
        continue;
      }
      const declared = collectDeclaredVersions(code, trackedNames);
      for (const [pkg, range] of Object.entries(declared)) {
        const bucket = (result.versions[pkg] ??= {});
        bucket[range] = (bucket[range] ?? 0) + 1;
      }
      continue;
    }

    result.filesScanned++;
    let code: string;
    try {
      const stat = fs.statSync(entry.path);
      if (stat.size > MAX_FILE_BYTES) continue;
      code = fs.readFileSync(entry.path, 'utf8');
    } catch {
      continue;
    }
    if (!mentionsTrackedPackage(code)) continue;
    result.filesParsed++;

    const usage = analyzeFile(code, ctx);
    for (const [pkg, u] of usage) {
      const meta = ctx.packages.get(pkg);
      if (!meta) continue;
      if (u.importStatements === 0 && Object.keys(u.symbols).length === 0) continue;

      const agg = (result.packages[pkg] ??= { fileCount: 0, refCount: 0, symbols: {} });
      agg.fileCount += 1;

      const symbolRefSum = Object.values(u.symbols).reduce((a, b) => a + b, 0);
      // Asset packages (and side-effect-only imports) have no symbols: fall back
      // to counting import statements so they still register references.
      agg.refCount += symbolRefSum > 0 ? symbolRefSum : u.importStatements;

      // Each symbol here is guaranteed >=1 occurrence in THIS file, so bump its
      // file count by exactly 1 (not by ref count) — distinct files, not refs.
      for (const [sym, count] of Object.entries(u.symbols)) {
        const entry = (agg.symbols[sym] ??= { fileCount: 0, refCount: 0 });
        entry.fileCount += 1;
        entry.refCount += count;
      }

      for (const [sym, propCounts] of Object.entries(u.props)) {
        const entry = (agg.symbols[sym] ??= { fileCount: 0, refCount: 0 });
        const props = (entry.props ??= {});
        for (const [propName, count] of Object.entries(propCounts)) {
          props[propName] = (props[propName] ?? 0) + count;
        }
      }
    }
  }

  return result;
}

/** Build the analyze context (package meta + allow-lists) from a symbol manifest. */
export function buildContext(manifest: {
  packages: Record<
    string,
    { type: PackageMeta['type']; symbols: Array<string>; legacy?: boolean; version?: string }
  >;
}): AnalyzeContext {
  const packages = new Map<string, PackageMeta>();
  for (const [name, m] of Object.entries(manifest.packages)) {
    packages.set(name, {
      type: m.type,
      symbols: new Set(m.symbols),
      legacy: m.legacy ?? false,
      version: m.version,
    });
  }
  return { packages };
}
