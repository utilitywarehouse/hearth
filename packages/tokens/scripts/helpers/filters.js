export const filters = {
  isStringToken: token => token.value && typeof token.alias === 'string',
  isFont: token => token.attributes.category === 'font',
  isFontSize: token => token.attributes.category === 'font' && token.attributes.type === 'size',
  isLayout: token => token.attributes.type === 'layout' && token.attributes.item === 'spacing',
  isTypography: token => {
    if (token.attributes.type === 'typography') {
      if (token.attributes.subitem === 'font-family') {
        return false;
      }
      if (token.name.includes('font-weight') && token.attributes.category !== 'mobile') {
        return false;
      }
      if (token.path.includes('letter-spacing')) {
        return false;
      }
      return token;
    }
  },
  isColor: token => {
    if (token.attributes?.type === 'dark') {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
  },
  isSpace: token => token.filePath.includes('primitive') && token.attributes.category === 'space',
  isLineHeight: token => token.attributes.category === 'line-height',
  isBorder: token => token.attributes.category.includes('border'),
};
