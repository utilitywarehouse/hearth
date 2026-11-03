import type { API, FileInfo, Identifier, JSXAttribute } from 'jscodeshift';
import { isShadowed } from '../../../utils/is-shadowed';
import { isJSXAttributeNamed } from '../../../utils/is-jsx-attribute-named';
import { isTypeOnly } from '../../../utils/is-type-only';

const HEARTH_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];
const ACCORDION_CONTENT = 'AccordionContent';

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
    // `import type { AccordionContent }` has no runtime binding to render
    .filter(
      path =>
        !isTypeOnly(path.value) && HEARTH_IMPORT_SOURCES.includes(String(path.value.source.value))
    );

  const localNames = new Set(
    hearthImports
      .find(j.ImportSpecifier)
      // `import { type AccordionContent }` is type-only too
      .filter(
        path =>
          (path.node.imported as Identifier).name === ACCORDION_CONTENT && !isTypeOnly(path.node)
      )
      .nodes()
      // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
      // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
      .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
  );

  // `import * as H from '...'` — usages are written `<H.AccordionContent>`
  const namespaceNames = new Set(
    hearthImports
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
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

  root.find(j.JSXElement).forEach(element => {
    const { name } = element.node.openingElement;
    let label: string | undefined;
    if (name.type === 'JSXIdentifier') {
      // a binding declared in an inner scope shadows the import
      if (localNames.has(name.name) && !isShadowed(element, name.name)) {
        label = name.name;
      }
    } else if (
      name.type === 'JSXMemberExpression' &&
      name.object.type === 'JSXIdentifier' &&
      namespaceNames.has(name.object.name) &&
      !isShadowed(element, name.object.name) &&
      name.property.name === ACCORDION_CONTENT
    ) {
      label = `${name.object.name}.${name.property.name}`;
    }

    if (!label) {
      return;
    }

    const warn = (message: string) =>
      console.warn(`${file.path}:${element.node.loc?.start.line ?? '?'} <${label}> ${message}`);

    const attributes = element.node.openingElement.attributes ?? [];

    if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
      // The spread may carry `keepMounted` or `forceMount`, and the renamed prop would
      // override it, so leave the element unchanged for review
      warn('spreads props that may include `forceMount` or `keepMounted`; review them manually');
      return;
    }

    const forceMountAttribute = attributes.find(isJSXAttributeNamed('forceMount'));
    if (!forceMountAttribute) {
      return;
    }

    if (!isBooleanLiteral(forceMountAttribute)) {
      warn('has a `forceMount` that is not a literal boolean; rename it to `keepMounted` manually');
      return;
    }

    const keepMountedAttribute = attributes.find(isJSXAttributeNamed('keepMounted'));
    if (!keepMountedAttribute) {
      forceMountAttribute.name = j.jsxIdentifier('keepMounted');
    } else if (isBooleanLiteral(keepMountedAttribute)) {
      // A literal `keepMounted` always takes precedence, so `forceMount` is unused
      element.node.openingElement.attributes = attributes.filter(
        attribute => attribute !== forceMountAttribute
      );
    } else {
      // `keepMounted` may be `undefined` at runtime, in which case `forceMount` was the fallback
      warn('has `forceMount` and a `keepMounted` that may be undefined; merge them manually');
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
