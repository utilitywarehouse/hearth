import type { API, FileInfo, Identifier, JSXAttribute } from 'jscodeshift';
import { getStringValue } from '../../../utils/get-string-value';
import { isShadowed } from '../../../utils/is-shadowed';

const HEARTH_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];
const MENU_COMPONENTS = ['MenuItem', 'MenuContent'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

// jscodeshift's typings omit `importKind` on specifiers, but the parser sets it
function isTypeOnly(node: object): boolean {
  return (node as { importKind?: string }).importKind === 'type';
}

/** Whether the attribute is a literal boolean, as `a`, `a={true}` or `a={false}`. */
function isBooleanLiteral(attribute: JSXAttribute): boolean {
  if (attribute.value === null || attribute.value === undefined) {
    return true;
  }
  if (attribute.value.type !== 'JSXExpressionContainer') {
    return false;
  }
  const { expression } = attribute.value;
  return (
    expression.type === 'BooleanLiteral' ||
    (expression.type === 'Literal' && typeof expression.value === 'boolean')
  );
}

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const hearthImports = root
    .find(j.ImportDeclaration)
    // `import type { MenuItem }` has no runtime binding to render
    .filter(
      path =>
        !isTypeOnly(path.value) && HEARTH_IMPORT_SOURCES.includes(String(path.value.source.value))
    );

  // Local name → Hearth component name, so `import { MenuItem as Item }` resolves to `MenuItem`
  const componentByLocalName = new Map<string, string>(
    hearthImports
      .find(j.ImportSpecifier)
      // `import { type MenuItem }` is type-only too
      .filter(
        path =>
          MENU_COMPONENTS.includes((path.node.imported as Identifier).name) &&
          !isTypeOnly(path.node)
      )
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => [
        ((specifier.local ?? specifier.imported) as Identifier).name,
        (specifier.imported as Identifier).name,
      ])
  );

  // `import * as H from '...'` — usages are written `<H.MenuItem>`
  const namespaceNames = new Set(
    hearthImports
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  if (componentByLocalName.size === 0 && namespaceNames.size === 0) {
    return file.source;
  }

  const getFirstNode = (): NodeWithComments =>
    // jscodeshift's NodePath#get() isn't generic, so `.node` resolves to `any`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    root.find(j.Program).get('body', 0).node as NodeWithComments;
  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  root.find(j.JSXElement).forEach(element => {
    const { name } = element.node.openingElement;
    let component: string | undefined;
    let label = '';
    if (name.type === 'JSXIdentifier') {
      // a binding declared in an inner scope shadows the import
      if (!isShadowed(element, name.name)) {
        component = componentByLocalName.get(name.name);
      }
      label = name.name;
    } else if (
      name.type === 'JSXMemberExpression' &&
      name.object.type === 'JSXIdentifier' &&
      namespaceNames.has(name.object.name) &&
      !isShadowed(element, name.object.name) &&
      MENU_COMPONENTS.includes(name.property.name)
    ) {
      component = name.property.name;
      label = `${name.object.name}.${name.property.name}`;
    }

    if (!component) {
      return;
    }

    const warn = (message: string) =>
      console.warn(`${file.path}:${element.node.loc?.start.line ?? '?'} <${label}> ${message}`);

    const attributes = element.node.openingElement.attributes ?? [];
    const hasSpread = attributes.some(attribute => attribute.type === 'JSXSpreadAttribute');
    const removeAttribute = (attribute: JSXAttribute) => {
      element.node.openingElement.attributes = (
        element.node.openingElement.attributes ?? []
      ).filter(other => other !== attribute);
    };

    if (component === 'MenuItem') {
      if (hasSpread) {
        // The spread may also carry the deprecated props (or override the migrated values)
        warn('spreads props that may include `onSelect` or `textValue`; review them manually');
      }

      const onSelectAttribute = attributes.find(isJSXAttributeNamed('onSelect'));
      if (onSelectAttribute) {
        if (!attributes.some(isJSXAttributeNamed('onClick'))) {
          // `onSelect` received the same click event, so this is a plain rename
          onSelectAttribute.name = j.jsxIdentifier('onClick');
        } else {
          // Both handlers run today (`onSelect` first), so they need combining by hand
          warn('has both `onSelect` and `onClick`; merge them manually');
        }
      }

      const textValueAttribute = attributes.find(isJSXAttributeNamed('textValue'));
      if (textValueAttribute) {
        const labelAttribute = attributes.find(isJSXAttributeNamed('label'));
        if (!labelAttribute) {
          textValueAttribute.name = j.jsxIdentifier('label');
        } else if (getStringValue(labelAttribute) !== undefined) {
          // A literal `label` always takes precedence (`label ?? textValue`), so `textValue` is unused
          removeAttribute(textValueAttribute);
        } else {
          // `label` may be `undefined` at runtime, in which case `textValue` was the fallback
          warn('has `textValue` and a `label` that may be undefined; merge them manually');
        }
      }
    } else {
      if (hasSpread) {
        warn(
          'spreads props that may include `forceMount`; rename it to `keepMounted` manually if so'
        );
      }

      const forceMountAttribute = attributes.find(isJSXAttributeNamed('forceMount'));
      if (forceMountAttribute) {
        const keepMountedAttribute = attributes.find(isJSXAttributeNamed('keepMounted'));
        if (!keepMountedAttribute) {
          forceMountAttribute.name = j.jsxIdentifier('keepMounted');
        } else if (isBooleanLiteral(keepMountedAttribute)) {
          // A literal `keepMounted` always takes precedence, so `forceMount` is unused
          removeAttribute(forceMountAttribute);
        } else {
          // `keepMounted` may be `undefined` at runtime, in which case `forceMount` was the fallback
          warn('has `forceMount` and a `keepMounted` that may be undefined; merge them manually');
        }
      }
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
