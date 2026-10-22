import type { API, FileInfo, Identifier, JSXAttribute, JSXElement } from 'jscodeshift';
import { getStringValue } from '../../../utils/get-string-value';
import { isShadowed } from '../../../utils/is-shadowed';

const MODAL_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

// jscodeshift's typings omit `importKind` on specifiers, but the parser sets it
function isTypeOnly(node: object): boolean {
  return (node as { importKind?: string }).importKind === 'type';
}

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const hearthImports = root
    .find(j.ImportDeclaration)
    // `import type { Modal }` has no runtime binding to render
    .filter(
      path =>
        !isTypeOnly(path.value) && MODAL_IMPORT_SOURCES.includes(String(path.value.source.value))
    );

  const modalLocalNames = new Set(
    hearthImports
      .find(j.ImportSpecifier)
      // `import { type Modal }` is type-only too
      .filter(path => path.node.imported.name === 'Modal' && !isTypeOnly(path.node))
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
  );

  // `import * as H from '...'` — usages are written `<H.Modal>`
  const namespaceNames = new Set(
    hearthImports
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  if (modalLocalNames.size === 0 && namespaceNames.size === 0) {
    return file.source;
  }

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  const warn = (element: JSXElement, message: string) =>
    console.warn(`${file.path}:${element.loc?.start.line ?? '?'} ${message}`);

  root
    .find(j.JSXElement)
    .filter(path => {
      const { name } = path.node.openingElement;
      if (name.type === 'JSXIdentifier') {
        // a binding declared in an inner scope shadows the import
        return modalLocalNames.has(name.name) && !isShadowed(path, name.name);
      }
      return (
        name.type === 'JSXMemberExpression' &&
        name.object.type === 'JSXIdentifier' &&
        namespaceNames.has(name.object.name) &&
        !isShadowed(path, name.object.name) &&
        name.property.name === 'Modal'
      );
    })
    .forEach(element => {
      const attributes = element.node.openingElement.attributes ?? [];
      const loadingTextAttribute = attributes.find(isJSXAttributeNamed('loadingText'));

      if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
        // The spread may also carry `loadingText` (or override the migrated value), so leave it for review
        warn(
          element.node,
          '<Modal> spreads props that may include `loadingText`; rename it to `loadingHeading` manually if so'
        );
      }

      if (!loadingTextAttribute) {
        return;
      }

      const loadingHeadingAttribute = attributes.find(isJSXAttributeNamed('loadingHeading'));

      if (!loadingHeadingAttribute) {
        // `loadingText` was the fallback heading — rename it to its replacement
        loadingTextAttribute.name = j.jsxIdentifier('loadingHeading');
      } else if (getStringValue(loadingHeadingAttribute)) {
        // A non-empty literal `loadingHeading` always takes precedence, so `loadingText` is redundant
        element.node.openingElement.attributes = attributes.filter(
          attribute => attribute !== loadingTextAttribute
        );
      } else {
        // `loadingHeading` may be empty at runtime (a non-literal, or `""`), in which case
        // `loadingText` was the fallback
        warn(
          element.node,
          '<Modal> has `loadingText` and a `loadingHeading` that may be empty; merge them manually'
        );
      }
    });

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }
  return root.toSource({ quote: 'single' });
}

export default transformer;
