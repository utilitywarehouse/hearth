import type { API, FileInfo, Identifier, JSXAttribute, JSXSpreadAttribute } from 'jscodeshift';
import { getStringValue } from '../../../utils/get-string-value';

const ACCORDION_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

interface NodeWithScope {
  scope?: { lookup(name: string): { isGlobal: boolean } | null } | null;
}

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

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

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  // and reprinting files that don't use Accordion
  if (getLocalNames('Accordion').size === 0) {
    return file.source;
  }

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  // Only elements that resolve to the import — a parameter or local with the same name shadows it
  const findImportedElements = (localName: string) =>
    root.findJSXElements(localName).filter(
      // jscodeshift's `NodePath#scope` isn't typed, so narrow it to the one method we use
      element => (element as NodeWithScope).scope?.lookup(localName)?.isGlobal ?? false
    );

  getLocalNames('Accordion').forEach(localName => {
    findImportedElements(localName).forEach(element => {
      const warn = (message: string) =>
        console.warn(
          `${file.path}:${element.node.loc?.start.line ?? '?'} <${localName}> ${message}`
        );
      const attributes = element.node.openingElement.attributes ?? [];
      const find = (name: string) => attributes.find(isJSXAttributeNamed(name));
      const remove = new Set<JSXAttribute | JSXSpreadAttribute>();
      const hasSpread = attributes.some(attribute => attribute.type === 'JSXSpreadAttribute');

      if (hasSpread) {
        // No literal attributes to match — the spread may carry any of the removed or changed props
        warn(
          'spreads props that may include `type`, `collapsible`, `value`, `defaultValue` or `onValueChange`; review them manually'
        );
      }

      const typeAttribute = find('type');
      if (typeAttribute) {
        const type = getStringValue(typeAttribute);
        if (type === 'single') {
          remove.add(typeAttribute);
        } else if (type === 'multiple') {
          if (find('multiple')) {
            // Already migrated — `multiple` is kept, so `type` is redundant
            remove.add(typeAttribute);
          } else {
            typeAttribute.name = j.jsxIdentifier('multiple');
            typeAttribute.value = null;
          }
        } else {
          warn('has a non-literal `type`; replace it with `multiple` (or remove it) manually');
        }
      } else if (!find('multiple') && !hasSpread) {
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
    findImportedElements(localName).forEach(element => {
      const attributes = element.node.openingElement.attributes ?? [];
      const forceMountAttribute = attributes.find(isJSXAttributeNamed('forceMount'));

      if (forceMountAttribute) {
        if (attributes.some(isJSXAttributeNamed('keepMounted'))) {
          // Already migrated — `keepMounted` takes precedence, so `forceMount` is redundant
          element.node.openingElement.attributes = attributes.filter(
            attribute => attribute !== forceMountAttribute
          );
        } else {
          // Same semantics, new name — rename preserves the value and the shorthand form
          forceMountAttribute.name = j.jsxIdentifier('keepMounted');
        }
      } else if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
        console.warn(
          `${file.path}:${element.node.loc?.start.line ?? '?'} <${localName}> spreads props that may include \`forceMount\`; rename it to \`keepMounted\` manually if so`
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
