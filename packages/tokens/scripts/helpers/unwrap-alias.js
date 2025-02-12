/**
 * Helper function to unwrap an alias like `{space.200}` => `space.200`
 */
export function unwrapAlias(aliasString) {
  return aliasString.replace(/^{|}$/g, '');
}
