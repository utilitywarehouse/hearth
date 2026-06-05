export const px = token => {
  // filter out CSS custom properties
  if (typeof token.value === 'string' && token.value.includes('var')) {
    return token.value;
  }
  return token.value + 'px';
};
