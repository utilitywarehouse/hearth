import type { API, FileInfo, JSXAttribute } from 'jscodeshift';

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

  const hasHearthModalImport =
    root
      .find(j.ImportDeclaration)
      .filter(path => MODAL_IMPORT_SOURCES.includes(String(path.value.source.value)))
      .find(j.ImportSpecifier)
      .filter(path => path.node.imported.name === 'Modal').length > 0;

  if (hasHearthModalImport) {
    root.findJSXElements('Modal').forEach(element => {
      const attributes = element.node.openingElement.attributes ?? [];
      const loadingTextAttribute = attributes.find(isJSXAttributeNamed('loadingText'));
      if (!loadingTextAttribute) {
        return;
      }

      const hasLoadingHeading = attributes.some(isJSXAttributeNamed('loadingHeading'));

      if (hasLoadingHeading) {
        // `loadingHeading` already takes precedence, so `loadingText` is redundant
        element.node.openingElement.attributes = attributes.filter(
          attribute => attribute !== loadingTextAttribute
        );
      } else {
        // `loadingText` was the fallback heading — rename it to its replacement
        loadingTextAttribute.name = j.jsxIdentifier('loadingHeading');
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
