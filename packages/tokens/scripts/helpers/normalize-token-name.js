export const DEVICES = ['mobile', 'tablet', 'desktop'];
export const DELIMITER = '-';

export const normalizeTokenName = token => {
  if (DEVICES.includes(token.path[0]) && token.path[1] === 'typography') {
    if (token.name.includes('font-weight')) {
      return token.path.slice(2).join(DELIMITER);
    }
    return [...token.path.slice(2), token.path[0]].join(DELIMITER);
  }
  if (token.path[0] === 'color' && token.path[1] === 'light') {
    return [token.path[0], ...token.path.slice(2)].join(DELIMITER);
  }
  if (token.path[0] === 'light') {
    return token.path.slice(1).join(DELIMITER);
  }
  return token.name;
};
