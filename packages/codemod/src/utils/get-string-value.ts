import type { JSXAttribute } from 'jscodeshift';

/** The attribute's value if it is a plain string, as `a="x"` or `a={'x'}`; otherwise `undefined`. */
export function getStringValue(attribute: JSXAttribute): string | undefined {
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
