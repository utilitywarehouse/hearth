import type { API, FileInfo, JSXAttribute } from 'jscodeshift';
import { getImportLocalNames } from '../../../utils/get-import-local-names';
import { getStringValue } from '../../../utils/get-string-value';
import { isShadowed } from '../../../utils/is-shadowed';

const CARD_ACCORDION_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

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

  const localNames = getImportLocalNames(
    j,
    root,
    CARD_ACCORDION_IMPORT_SOURCES,
    'CardAccordion'
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  // and reprinting files that don't use CardAccordion
  if (localNames.size === 0) {
    return file.source;
  }

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  localNames.forEach(localName => {
    // Only elements that resolve to the import — a parameter or local with the same name shadows it
    root
      .findJSXElements(localName)
      .filter(element => !isShadowed(element, localName))
      .forEach(element => {
        const warn = (message: string) =>
          console.warn(
            `${file.path}:${element.node.loc?.start.line ?? '?'} <${localName}> ${message}`
          );
        const attributes = element.node.openingElement.attributes ?? [];
        const find = (name: string) => attributes.find(isJSXAttributeNamed(name));

        if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
          // No literal attributes to match — the spread may carry `value` or `onValueChange`
          warn('spreads props that may include `value` or `onValueChange`; review them manually');
        }

        const valueAttribute = find('value');
        if (valueAttribute) {
          const stringValue = getStringValue(valueAttribute);
          if (stringValue !== undefined) {
            // `''` meant "nothing open" — `['']` would be an item id that doesn't exist
            valueAttribute.value = j.jsxExpressionContainer(
              j.arrayExpression(stringValue === '' ? [] : [j.stringLiteral(stringValue)])
            );
          } else if (
            !(
              valueAttribute.value?.type === 'JSXExpressionContainer' &&
              valueAttribute.value.expression.type === 'ArrayExpression'
            )
          ) {
            warn('has a non-literal `value`; it must now be a `string[]`, wrap it manually');
          }
        }

        if (find('onValueChange')) {
          warn(
            '`onValueChange` now receives a `string[]` as its first argument; review the handler manually'
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
