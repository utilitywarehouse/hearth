import type { API, FileInfo, Identifier, JSXAttribute } from 'jscodeshift';
import { getImportLocalNames } from '../../../utils/get-import-local-names';
import { getStringValue } from '../../../utils/get-string-value';
import { isShadowed } from '../../../utils/is-shadowed';
import { isTypeOnly } from '../../../utils/is-type-only';

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

  // `import * as H from '...'` — usages are written `<H.CardAccordion>`
  const namespaceNames = new Set(
    root
      .find(j.ImportDeclaration)
      .filter(
        path =>
          !isTypeOnly(path.value) &&
          CARD_ACCORDION_IMPORT_SOURCES.includes(String(path.value.source.value))
      )
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  // and reprinting files that don't use CardAccordion
  if (localNames.size === 0 && namespaceNames.size === 0) {
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
    .map(path => {
      const { name } = path.node.openingElement;
      // A binding declared in an inner scope shadows the import
      if (name.type === 'JSXIdentifier') {
        return localNames.has(name.name) && !isShadowed(path, name.name) ? [path] : [];
      }
      return name.type === 'JSXMemberExpression' &&
        name.object.type === 'JSXIdentifier' &&
        namespaceNames.has(name.object.name) &&
        !isShadowed(path, name.object.name) &&
        name.property.name === 'CardAccordion'
        ? [path]
        : [];
    })
    .forEach(element => {
      const { name } = element.node.openingElement;
      const tagName =
        name.type === 'JSXMemberExpression' && name.object.type === 'JSXIdentifier'
          ? `${name.object.name}.CardAccordion`
          : (name as { name: string }).name;
      const warn = (message: string) =>
        console.warn(`${file.path}:${element.node.loc?.start.line ?? '?'} <${tagName}> ${message}`);
      const attributes = element.node.openingElement.attributes ?? [];
      const find = (attrName: string) => attributes.find(isJSXAttributeNamed(attrName));

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

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }
  return root.toSource({ quote: 'single' });
}

export default transformer;
