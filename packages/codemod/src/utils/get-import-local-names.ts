import type { Collection, Identifier, JSCodeshift } from 'jscodeshift';

/**
 * Local names bound to `importedName` by named imports from any of `sources`
 * (the alias for `import { Modal as M }`, otherwise the name itself).
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
      .filter(path => sources.includes(String(path.value.source.value)))
      .find(j.ImportSpecifier)
      .filter(path => path.node.imported.name === importedName)
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
  );
}
