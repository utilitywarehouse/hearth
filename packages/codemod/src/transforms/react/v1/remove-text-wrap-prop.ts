import type { API, FileInfo, Identifier, JSXAttribute } from 'jscodeshift';
import { isShadowed } from '../../../utils/is-shadowed';

const HEARTH_IMPORT_SOURCES = ['@utilitywarehouse/hearth-react'];
const TEXT_WRAP_COMPONENTS = ['BodyText', 'Heading', 'Strong', 'Em', 'DetailText'];

function isJSXAttributeNamed(name: string) {
  return (attribute: unknown): attribute is JSXAttribute =>
    (attribute as JSXAttribute).type === 'JSXAttribute' &&
    (attribute as JSXAttribute).name.name === name;
}

// jscodeshift's typings omit `importKind` on specifiers, but the parser sets it
function isTypeOnly(node: object): boolean {
  return (node as { importKind?: string }).importKind === 'type';
}

interface NodeWithComments {
  comments?: unknown;
}

function transformer(file: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(file.source);

  const hearthImports = root
    .find(j.ImportDeclaration)
    // `import type { BodyText }` has no runtime binding to render
    .filter(
      path =>
        !isTypeOnly(path.value) && HEARTH_IMPORT_SOURCES.includes(String(path.value.source.value))
    );

  const localNamesByComponent = new Map<string, Set<string>>(
    TEXT_WRAP_COMPONENTS.map(componentName => [
      componentName,
      new Set(
        hearthImports
          .find(j.ImportSpecifier)
          // `import { type BodyText }` is type-only too
          .filter(path => path.node.imported.name === componentName && !isTypeOnly(path.node))
          .nodes()
          // `local`/`imported` are always plain `Identifier`s on an `ImportSpecifier` — the
          // broader `IdentifierKind` type only matters for `TSTypeParameter`, which can't appear here
          .map(specifier => ((specifier.local ?? specifier.imported) as Identifier).name)
      ),
    ])
  );

  // `import * as H from '...'` — usages are written `<H.BodyText>`
  const namespaceNames = new Set(
    hearthImports
      .find(j.ImportNamespaceSpecifier)
      .nodes()
      .map(specifier => (specifier.local as Identifier).name)
  );

  const hasAnyLocalName = Array.from(localNamesByComponent.values()).some(
    localNames => localNames.size > 0
  );

  // Nothing to transform — also avoids a crash on empty/comment-only files (no first node)
  if (!hasAnyLocalName && namespaceNames.size === 0) {
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
        return (
          Array.from(localNamesByComponent.values()).some(localNames =>
            localNames.has(name.name)
          ) && !isShadowed(path, name.name)
        );
      }
      return (
        name.type === 'JSXMemberExpression' &&
        name.object.type === 'JSXIdentifier' &&
        namespaceNames.has(name.object.name) &&
        !isShadowed(path, name.object.name) &&
        TEXT_WRAP_COMPONENTS.includes(name.property.name)
      );
    })
    .forEach(element => {
      const { name } = element.node.openingElement;
      const label =
        name.type === 'JSXIdentifier'
          ? name.name
          : name.type === 'JSXMemberExpression' && name.object.type === 'JSXIdentifier'
            ? `${name.object.name}.${name.property.name}`
            : '';
      const warn = (message: string) =>
        console.warn(`${file.path}:${element.node.loc?.start.line ?? '?'} <${label}> ${message}`);

      const attributes = element.node.openingElement.attributes ?? [];
      const wrapAttribute = attributes.find(isJSXAttributeNamed('wrap'));
      const textWrapAttribute = attributes.find(isJSXAttributeNamed('textWrap'));

      if (attributes.some(attribute => attribute.type === 'JSXSpreadAttribute')) {
        // The spread may also carry `wrap` or `textWrap`, so leave it for review
        warn('spreads props that may include `wrap` or `textWrap`; review them manually');
      }

      if (!wrapAttribute) {
        return;
      }

      if (!textWrapAttribute) {
        // `wrap` and `textWrap` share the same tokens and CSS class prefix, so this is a plain rename
        wrapAttribute.name = j.jsxIdentifier('textWrap');
      } else {
        // Which one's styles apply depends on `extractProps`' processing order and the fixed CSS
        // rule order, not simply "last prop wins" — too ambiguous to rewrite automatically
        warn('has both `wrap` and `textWrap`; merge them manually');
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
