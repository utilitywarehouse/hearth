import type { API, FileInfo, Identifier, JSXAttribute, JSXSpreadAttribute } from 'jscodeshift';

const ACCORDION_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

/** The attribute's value if it is a plain string, as `a="x"` or `a={'x'}`; otherwise `undefined`. */
function getStringValue(attribute: JSXAttribute): string | undefined {
  const node =
    attribute.value?.type === 'JSXExpressionContainer'
      ? attribute.value.expression
      : attribute.value;
  if (
    node &&
    (node.type === 'StringLiteral' || node.type === 'Literal') &&
    typeof node.value === 'string'
  ) {
    return node.value;
  }
  return undefined;
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

  const getLocalNames = (importedName: string) =>
    new Set(
      root
        .find(j.ImportDeclaration)
        .filter(path => ACCORDION_IMPORT_SOURCES.includes(String(path.value.source.value)))
        .find(j.ImportSpecifier)
        .filter(path => path.node.imported.name === importedName)
        .nodes()
        // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
        // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
        .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
    );

  getLocalNames('Accordion').forEach(localName => {
    root.findJSXElements(localName).forEach(element => {
      const warn = (message: string) =>
        console.warn(
          `${file.path}:${element.node.loc?.start.line ?? '?'} <${localName}> ${message}`
        );
      const attributes = element.node.openingElement.attributes ?? [];
      const find = (name: string) => attributes.find(isJSXAttributeNamed(name));
      const remove = new Set<JSXAttribute | JSXSpreadAttribute>();

      const typeAttribute = find('type');
      if (typeAttribute) {
        const type = getStringValue(typeAttribute);
        if (type === 'single') {
          remove.add(typeAttribute);
        } else if (type === 'multiple') {
          typeAttribute.name = j.jsxIdentifier('multiple');
          typeAttribute.value = null;
        } else {
          warn('has a non-literal `type`; replace it with `multiple` (or remove it) manually');
        }
      } else if (!find('multiple')) {
        // No literal `type` — the old runtime default was multi-select, so single-select may be wrong
        warn(
          'has no `type` attribute; it used to default to multi-select, add `multiple` if that is still intended'
        );
      }

      const collapsibleAttribute = find('collapsible');
      if (collapsibleAttribute) {
        remove.add(collapsibleAttribute);
      }

      ['value', 'defaultValue'].forEach(name => {
        const attribute = find(name);
        if (!attribute) {
          return;
        }
        const stringValue = getStringValue(attribute);
        if (stringValue !== undefined) {
          // `''` meant "nothing open" in single mode — `['']` would be an item id that doesn't exist
          attribute.value = j.jsxExpressionContainer(
            j.arrayExpression(stringValue === '' ? [] : [j.stringLiteral(stringValue)])
          );
        } else if (
          !(
            attribute.value?.type === 'JSXExpressionContainer' &&
            attribute.value.expression.type === 'ArrayExpression'
          )
        ) {
          warn(`has a non-literal \`${name}\`; it must now be a \`string[]\`, wrap it manually`);
        }
      });

      if (find('onValueChange')) {
        warn(
          '`onValueChange` now receives a `string[]` as its first argument; review the handler manually'
        );
      }

      if (remove.size) {
        element.node.openingElement.attributes = attributes.filter(
          attribute => !remove.has(attribute)
        );
      }
    });
  });

  getLocalNames('AccordionContent').forEach(localName => {
    root.findJSXElements(localName).forEach(element => {
      const forceMountAttribute = (element.node.openingElement.attributes ?? []).find(
        isJSXAttributeNamed('forceMount')
      );
      if (forceMountAttribute) {
        // Same semantics, new name — rename preserves the value and the shorthand form
        forceMountAttribute.name = j.jsxIdentifier('keepMounted');
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
