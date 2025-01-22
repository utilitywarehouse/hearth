/**
 * Helper function to unwrap an alias like `{space.200}` => `space.200`
 */
function unwrapAlias(aliasString) {
  return aliasString.replace(/^{|}$/g, '').replace(/colour/, 'color');
}

export default unwrapAlias;
