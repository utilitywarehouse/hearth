import type { API, FileInfo, Identifier, JSXAttribute } from 'jscodeshift';

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

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  const modalLocalNames = new Set(
    root
      .find(j.ImportDeclaration)
      .filter(path => MODAL_IMPORT_SOURCES.includes(String(path.value.source.value)))
      .find(j.ImportSpecifier)
      .filter(path => path.node.imported.name === 'Modal')
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
  );

  modalLocalNames.forEach(localName => {
    root.findJSXElements(localName).forEach(element => {
      const attributes = element.node.openingElement.attributes ?? [];
      const fullScreenAttribute = attributes.find(isJSXAttributeNamed('fullScreen'));

      if (fullScreenAttribute) {
        // `fullScreen` was a no-op, so removing it in any form never changes behaviour
        element.node.openingElement.attributes = attributes.filter(
          attribute => attribute !== fullScreenAttribute
        );
        return;
      }

      if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
        // No literal attribute to match — the spread may carry `fullScreen`, so leave it for review
        console.warn(
          `${file.path}:${element.node.loc?.start.line ?? '?'} <${localName}> spreads props that may include \`fullScreen\`; remove it manually if so`
        );
      }
    });
  });

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }
  return root.toSource({ quote: 'single' });
}

export default transformer;
