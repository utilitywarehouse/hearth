import type { API, FileInfo, Identifier } from 'jscodeshift';
import { getImportLocalNames } from '../../../utils/get-import-local-names';
import { isShadowed } from '../../../utils/is-shadowed';
import { isTypeOnly } from '../../../utils/is-type-only';

const IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];
const OLD_NAME = 'CardBannerImage';
const NEW_NAME = 'BannerImage';

interface NodeWithComments {
  comments?: unknown;
}

/**
 * Renames the deprecated `CardBannerImage` to `BannerImage`, which has identical props.
 */
function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const hearthImports = root
    .find(j.ImportDeclaration)
    .filter(
      path => !isTypeOnly(path.value) && IMPORT_SOURCES.includes(String(path.value.source.value))
    );

  const oldSpecifiers = hearthImports
    .find(j.ImportSpecifier)
    .filter(path => path.node.imported.name === OLD_NAME && !isTypeOnly(path.node));

  // `import * as H from '...'` — usages are written `<H.CardBannerImage>`
  const namespaceNames = new Set(
    hearthImports
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  if (oldSpecifiers.size() === 0 && namespaceNames.size === 0) {
    return file.source;
  }

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  const existingBannerImageNames = [...getImportLocalNames(j, root, IMPORT_SOURCES, NEW_NAME)];

  // Local names that are written `CardBannerImage` at usage sites and need renaming
  const renames = new Map<string, string>();

  oldSpecifiers.forEach(path => {
    const specifier = path.node;
    const local = ((specifier.local ?? specifier.imported) as Identifier).name;

    if (local !== OLD_NAME) {
      // `CardBannerImage as Card` — usages keep the alias, only the imported name changes
      specifier.imported = j.identifier(NEW_NAME);
    } else if (existingBannerImageNames.length > 0) {
      // `BannerImage` is already imported, so drop the duplicate binding
      renames.set(OLD_NAME, existingBannerImageNames[0]);
      j(path).remove();
    } else {
      specifier.imported = j.identifier(NEW_NAME);
      specifier.local = j.identifier(NEW_NAME);
      renames.set(OLD_NAME, NEW_NAME);
    }
  });

  const renamedTo = renames.get(OLD_NAME);
  if (renamedTo) {
    root.find(j.JSXElement).forEach(path => {
      const { openingElement, closingElement } = path.node;
      if (
        openingElement.name.type !== 'JSXIdentifier' ||
        openingElement.name.name !== OLD_NAME ||
        isShadowed(path, OLD_NAME)
      ) {
        return;
      }
      openingElement.name = j.jsxIdentifier(renamedTo);
      if (closingElement) closingElement.name = j.jsxIdentifier(renamedTo);
    });

    // Non-JSX references, e.g. `typeof CardBannerImage` or passing it as a value
    root
      .find(j.Identifier, { name: OLD_NAME })
      .filter(path => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const parent = path.parent.node as { type: string; property?: unknown; key?: unknown };
        return (
          parent.type !== 'ImportSpecifier' &&
          !(parent.type === 'MemberExpression' && parent.property === path.node) &&
          !(parent.type === 'Property' && parent.key === path.node) &&
          !isShadowed(path, OLD_NAME)
        );
      })
      .forEach(path => {
        path.node.name = renamedTo;
      });
  }

  if (namespaceNames.size > 0) {
    root.find(j.JSXMemberExpression, { property: { name: OLD_NAME } }).forEach(path => {
      const { object } = path.node;
      if (
        object.type === 'JSXIdentifier' &&
        namespaceNames.has(object.name) &&
        !isShadowed(path, object.name)
      ) {
        path.node.property = j.jsxIdentifier(NEW_NAME);
      }
    });
    root.find(j.MemberExpression, { property: { name: OLD_NAME } }).forEach(path => {
      const { object } = path.node;
      if (
        !path.node.computed &&
        object.type === 'Identifier' &&
        namespaceNames.has(object.name) &&
        !isShadowed(path, object.name)
      ) {
        path.node.property = j.identifier(NEW_NAME);
      }
    });
  }

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }
  return root.toSource({ quote: 'single' });
}

export default transformer;
