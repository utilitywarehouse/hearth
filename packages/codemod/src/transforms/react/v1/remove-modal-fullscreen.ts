import type { API, FileInfo, Identifier } from 'jscodeshift';
import { getImportLocalNames } from '../../../utils/get-import-local-names';
import { isShadowed } from '../../../utils/is-shadowed';
import { isJSXAttributeNamed } from '../../../utils/is-jsx-attribute-named';
import { isTypeOnly } from '../../../utils/is-type-only';

const MODAL_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const modalLocalNames = getImportLocalNames(j, root, MODAL_IMPORT_SOURCES, 'Modal');

  // `import * as H from '...'` — usages are written `<H.Modal>`
  const namespaceNames = new Set(
    root
      .find(j.ImportDeclaration)
      .filter(
        path =>
          !isTypeOnly(path.value) && MODAL_IMPORT_SOURCES.includes(String(path.value.source.value))
      )
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
      const { name } = element.node.openingElement;
      const label =
        name.type === 'JSXMemberExpression' && name.object.type === 'JSXIdentifier'
          ? `${name.object.name}.${name.property.name}`
          : name.type === 'JSXIdentifier'
            ? name.name
            : '';
      const attributes = element.node.openingElement.attributes ?? [];
      const fullScreenAttribute = attributes.find(isJSXAttributeNamed('fullScreen'));

      if (fullScreenAttribute) {
        // `fullScreen` was a no-op, so removing it in any form never changes behaviour
        element.node.openingElement.attributes = attributes.filter(
          attribute => attribute !== fullScreenAttribute
        );
      }

      if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
        // The spread may also carry `fullScreen`, so leave it for review
        console.warn(
          `${file.path}:${element.node.loc?.start.line ?? '?'} <${label}> spreads props that may include \`fullScreen\`; remove it manually if so`
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
