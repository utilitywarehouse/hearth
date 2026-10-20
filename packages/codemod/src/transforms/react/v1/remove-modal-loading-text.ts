import type { API, FileInfo, Identifier, JSXAttribute, JSXElement } from 'jscodeshift';

const MODAL_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const hearthImports = root
    .find(j.ImportDeclaration)
    .filter(path => MODAL_IMPORT_SOURCES.includes(String(path.value.source.value)));

  const modalLocalNames = new Set(
    hearthImports
      .find(j.ImportSpecifier)
      .filter(path => path.node.imported.name === 'Modal')
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
    .filter(({ node }) => {
      const { name } = node.openingElement;
      if (name.type === 'JSXIdentifier') {
        return modalLocalNames.has(name.name);
      }
      return (
        name.type === 'JSXMemberExpression' &&
        name.object.type === 'JSXIdentifier' &&
        namespaceNames.has(name.object.name) &&
        name.property.name === 'Modal'
      );
    })
    .forEach(element => {
      const attributes = element.node.openingElement.attributes ?? [];
      const loadingTextAttribute = attributes.find(isJSXAttributeNamed('loadingText'));
      if (!loadingTextAttribute) {
        if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
          // No literal attribute to match — the spread may carry `loadingText`, so leave it for review
          warn(
            element.node,
            '<Modal> spreads props that may include `loadingText`; rename it to `loadingHeading` manually if so'
          );
        }
        return;
      }

      const loadingHeadingAttribute = attributes.find(isJSXAttributeNamed('loadingHeading'));

      if (!loadingHeadingAttribute) {
        // `loadingText` was the fallback heading — rename it to its replacement
        loadingTextAttribute.name = j.jsxIdentifier('loadingHeading');
      } else if (loadingHeadingAttribute.value?.type === 'StringLiteral') {
        // A literal `loadingHeading` always takes precedence, so `loadingText` is redundant
        element.node.openingElement.attributes = attributes.filter(
          attribute => attribute !== loadingTextAttribute
        );
      } else {
        // `loadingHeading` may be empty at runtime, in which case `loadingText` was the fallback
        warn(
          element.node,
          '<Modal> has `loadingText` and a non-literal `loadingHeading`; merge them manually'
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
