export const DEVICES = ['mobile', 'tablet', 'desktop'];
export const DELIMITER = '-';

// normalize the token name from it's Figma path
export const normalizeTokenName = token => {
  // Move device name from being a prefix to a modifier
  if (DEVICES.includes(token.path[0]) && token.path[1] === 'typography') {
    // except for font-weight where it's not needed at all
    if (token.name.includes('font-weight')) {
      return token.path.slice(2).join(DELIMITER);
    }
    return [...token.path.slice(2), token.path[0]].join(DELIMITER);
  }
  // Remove any `light` prefix for the CSS color scales
  if (token.path[0] === 'color' && token.path[1] === 'light') {
    return [token.path[0], ...token.path.slice(2)].join(DELIMITER);
  }
  // Remove any `light` prefix for component CSS
  if (token.path[0] === 'light') {
    return token.path.slice(1).join(DELIMITER);
  }
  return token.name;
};
