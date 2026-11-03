import type { Collection, Identifier, JSCodeshift } from 'jscodeshift';
import { isTypeOnly } from './is-type-only';

/**
 * Local names bound to `importedName` by runtime named imports from any of `sources`
 * (the alias for `import { Modal as M }`, otherwise the name itself). Type-only imports are
 * erased at runtime, so they can't identify a component.
 */
export function getImportLocalNames(
  j: JSCodeshift,
  root: Collection,
  sources: Array<string>,
  importedName: string
): Set<string> {
  return new Set(
    root
      .find(j.ImportDeclaration)
      .filter(path => !isTypeOnly(path.value) && sources.includes(String(path.value.source.value)))
      .find(j.ImportSpecifier)
      .filter(path => path.node.imported.name === importedName && !isTypeOnly(path.node))
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
  );
}
