import type { API, ASTPath, FileInfo, Identifier } from 'jscodeshift';
import { getImportLocalNames } from '../../../utils/get-import-local-names';
import { isShadowed } from '../../../utils/is-shadowed';
import { isTypeOnly } from '../../../utils/is-type-only';

const IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];
const OLD_NAME = 'CardBannerImage';
const NEW_NAME = 'BannerImage';

interface NodeWithComments {
  comments?: unknown;
}

// NodePath#parent isn't generic, so `.node` resolves to `any`
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const parentNode = (path: ASTPath): unknown => path.parent.node;

/** Whether an identifier named after the component refers to the binding, not a property name. */
function isReference(path: ASTPath<Identifier>): boolean {
  const node = path.node;
  const parent = parentNode(path) as {
    type: string;
    computed?: boolean;
    property?: unknown;
    key?: unknown;
    left?: unknown;
  };
  switch (parent.type) {
    case 'ImportSpecifier':
    case 'ImportDefaultSpecifier':
      return false;
    case 'ExportSpecifier':
      // the local side of `export { X }` refers to the binding; re-exports (`from '...'`) don't
      return (
        (parent as { local?: unknown }).local === node &&
        !(parentNode(path.parent as ASTPath) as { source?: unknown }).source
      );
    case 'MemberExpression':
    case 'OptionalMemberExpression':
      return !!parent.computed || parent.property !== node;
    case 'TSQualifiedName':
      return parent.left === node;
    default:
      // object/class/interface member names, unless computed (`{ [CardBannerImage]: 1 }`)
      return (
        !!parent.computed || parent.key !== node || (parent as { value?: unknown }).value === node
      );
  }
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

  // Usages of the unaliased `CardBannerImage` binding, collected before any rename
  const jsxUsages = root.find(j.JSXElement).filter(path => {
    const { name } = path.node.openingElement;
    return name.type === 'JSXIdentifier' && name.name === OLD_NAME && !isShadowed(path, OLD_NAME);
  });
  const identifierUsages = root
    .find(j.Identifier, { name: OLD_NAME })
    .filter(path => isReference(path) && !isShadowed(path, OLD_NAME));

  // The name usages would take: `BannerImage`, or the local name it is already imported under.
  // Renaming is only safe when no usage sits in a scope that declares that name, and (for a fresh
  // name) nothing else in the file already uses it.
  const target = existingBannerImageNames[0] ?? NEW_NAME;
  const canRename =
    // a lowercase JSX tag is an intrinsic element, not the imported component
    !(jsxUsages.size() > 0 && target[0] === target[0].toLowerCase()) &&
    !jsxUsages.paths().some(path => isShadowed(path, target)) &&
    !identifierUsages.paths().some(path => isShadowed(path, target)) &&
    (existingBannerImageNames.length > 0 ||
      (root.find(j.Identifier, { name: NEW_NAME }).size() === 0 &&
        root.find(j.JSXIdentifier, { name: NEW_NAME }).size() === 0));

  let renamedTo: string | undefined;

  oldSpecifiers.forEach(path => {
    const specifier = path.node;
    const local = ((specifier.local ?? specifier.imported) as Identifier).name;

    if (local !== OLD_NAME || !canRename) {
      // `CardBannerImage as Card`, or a rename that could collide: usages keep the local name and
      // only the imported name changes
      path.replace(j.importSpecifier(j.identifier(NEW_NAME), j.identifier(local)));
    } else if (existingBannerImageNames.length > 0) {
      // `BannerImage` is already imported, so drop the duplicate binding
      j(path).remove();
      renamedTo = target;
    } else {
      specifier.imported = j.identifier(NEW_NAME);
      specifier.local = j.identifier(NEW_NAME);
      renamedTo = NEW_NAME;
    }
  });

  if (renamedTo) {
    const newName = renamedTo;
    jsxUsages.forEach(path => {
      const { openingElement, closingElement } = path.node;
      openingElement.name = j.jsxIdentifier(newName);
      if (closingElement) closingElement.name = j.jsxIdentifier(newName);
    });

    // Non-JSX references, e.g. `typeof CardBannerImage` or passing it as a value
    identifierUsages.forEach(path => {
      const parent = parentNode(path) as {
        type: string;
        shorthand?: boolean;
        key?: unknown;
        exported?: Identifier;
      };
      if (parent.type === 'ExportSpecifier') {
        // keep the exported name: `export { CardBannerImage }` -> `export { BannerImage as CardBannerImage }`
        const exportedName = (parent.exported ?? path.node).name;
        j(path.parent as ASTPath).replaceWith(
          j.exportSpecifier.from({
            local: j.identifier(newName),
            exported: j.identifier(exportedName),
          })
        );
        return;
      }
      if (parent.shorthand && parent.key !== path.node) {
        // `{ CardBannerImage }` must keep its key
        parent.shorthand = false;
        parent.key = j.identifier(OLD_NAME);
      }
      path.node.name = newName;
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
    root.find(j.TSQualifiedName, { right: { name: OLD_NAME } }).forEach(path => {
      const { left } = path.node;
      if (
        left.type === 'Identifier' &&
        namespaceNames.has(left.name) &&
        !isShadowed(path, left.name)
      ) {
        path.node.right = j.identifier(NEW_NAME);
      }
    });
    root
      .find(j.MemberExpression)
      .filter(path => {
        const { property, computed } = path.node;
        return (
          !!computed &&
          (property.type === 'StringLiteral' || property.type === 'Literal') &&
          property.value === OLD_NAME
        );
      })
      .forEach(path => {
        const { object } = path.node;
        if (
          object.type === 'Identifier' &&
          namespaceNames.has(object.name) &&
          !isShadowed(path, object.name)
        ) {
          path.node.property = j.stringLiteral(NEW_NAME);
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
