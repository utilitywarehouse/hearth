export const DEVICES = ['mobile', 'tablet', 'desktop'];
export const DELIMITER = '-';

export const normalizeTokenPath = token => {
  // Move device name from being a prefix to a modifier
  if (DEVICES.includes(token.path[0])) {
    // except for font-weight where it's not needed at all
    if (token.path.includes('font-weight')) {
      return token.path.slice(2);
    }
    // also not needed for body-text
    if (token.path.includes('body-text')) {
      return token.path.slice(2);
    }
    // also not needed for detail-text
    if (token.path.includes('detail-text')) {
      return token.path.slice(2);
    }
    return [...token.path.slice(2), token.path[0]];
  }
  // Remove any `light` prefix for the CSS color scales
  if (token.path[0] === 'color' && token.path[1] === 'light') {
    return [token.path[0], ...token.path.slice(2)];
  }
  // Remove any `light` prefix for component CSS
  if (token.path[0] === 'light') {
    return token.path.slice(1);
  }
  return token.path;
};

export const normalizeTokenName = (token, config) => {
  const normalizedPath = normalizeTokenPath(token);
  return [config.prefix, ...normalizedPath].join(DELIMITER);
};
