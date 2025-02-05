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
  isColor: token => token.type === 'color',
  isPrimitiveLightColor: token => {
    if (token.type === 'color' && token.path[1] === 'dark') {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
  },
  isSpace: token => token.filePath.includes('primitive') && token.path.includes('space'),
  isLineHeight: token => token.attributes.category === 'line-height',
  isBorder: token => token.attributes.category.includes('border'),
};
