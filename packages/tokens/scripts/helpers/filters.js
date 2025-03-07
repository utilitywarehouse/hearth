// Shared filters for gathering specific sets of tokens.
// These avoid using `token.attributes` as we can't rely that they'll always be
// available. Use `token.path` instead.
export const filters = {
  isStringToken: token => token.value && typeof token.alias === 'string',
  isFont: token => token.path.includes('font'),
  isFontSize: token => token.attributes.category === 'font' && token.attributes.type === 'size',
  isLayoutSpacing: token => token.path.includes('layout') && token.path.includes('spacing'),
  isTypography: token => {
    if (token.path.includes('typography')) {
      if (token.path.includes('font-family')) {
        // this is one alias too far, we can use primitive tokens for this
        return false;
      }
      // font-weight does not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('font-weight') && !token.path.includes('mobile')) {
        return false;
      }
      // body-text values do not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('body-text') && !token.path.includes('mobile')) {
        return false;
      }
      // detail-text values do not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('detail-text') && !token.path.includes('mobile')) {
        return false;
      }
      return token;
    }
  },
  isColor: token => token.type === 'color',
  isPrimitiveSpace: token => token.filePath.includes('primitive') && token.path.includes('space'),
  isPrimitiveBorder: token =>
    token.filePath.includes('primitive') &&
    (token.path.includes('border-width') || token.path.includes('border-radius')),
  isPrimitiveLineHeight: token =>
    token.filePath.includes('primitive') && token.path.includes('line-height'),
  isPrimitiveLetterSpacing: token =>
    token.filePath.includes('primitive') && token.path.includes('letter-spacing'),
  isPrimitiveLightColor: token => {
    if (token.type === 'color' && token.path[1] === 'dark') {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
  },
  isOpacity: token => token.filePath.includes('semantic') && token.path.includes('opacity'),
  isSpinnerComponentSize: token => {
    return (
      token.filePath.includes('component') &&
      token.path.includes('spinner') &&
      // we only want the size values, not the stroke width
      token.path.includes('size')
    );
  },
};
