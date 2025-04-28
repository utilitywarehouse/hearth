import { ViewStyle } from 'react-native';

/**
 * Mapping of shorthand props to their full style property names
 */
export const propStyleMapping: { [key: string]: keyof ViewStyle } = {
  // Padding
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  // Margin
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  // Colors
  bg: 'backgroundColor',
  bgColor: 'backgroundColor',
  // Dimensions
  h: 'height',
  w: 'width',
  // Border
  rounded: 'borderRadius',
  // Spacing
  spacing: 'gap',
  space: 'gap',
};

/**
 * Mapping of style props to their theme category
 */
export const themeStyleMapping: { [key in keyof ViewStyle]?: string } = {
  // Space related
  top: 'space',
  bottom: 'space',
  left: 'space',
  right: 'space',
  padding: 'space',
  paddingHorizontal: 'space',
  paddingVertical: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  paddingEnd: 'space',
  paddingStart: 'space',
  margin: 'space',
  marginHorizontal: 'space',
  marginVertical: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginRight: 'space',
  marginEnd: 'space',
  marginStart: 'space',
  columnGap: 'space',
  gap: 'space',
  rowGap: 'space',
  height: 'space',
  width: 'space',
  minHeight: 'space',
  minWidth: 'space',
  maxWidth: 'space',
  maxHeight: 'space',
  start: 'space',
  end: 'space',
  // Colors
  backgroundColor: 'color',
  borderColor: 'color',
  borderBottomColor: 'color',
  borderLeftColor: 'color',
  borderRightColor: 'color',
  borderTopColor: 'color',
  borderBlockColor: 'color',
  borderBlockEndColor: 'color',
  borderBlockStartColor: 'color',
  borderEndColor: 'color',
  borderStartColor: 'color',
  outlineColor: 'color',
  shadowColor: 'color',
  // Border radii
  borderRadius: 'borderRadius',
  borderBottomEndRadius: 'borderRadius',
  borderBottomLeftRadius: 'borderRadius',
  borderBottomRightRadius: 'borderRadius',
  borderBottomStartRadius: 'borderRadius',
  borderTopEndRadius: 'borderRadius',
  borderTopLeftRadius: 'borderRadius',
  borderTopRightRadius: 'borderRadius',
  borderTopStartRadius: 'borderRadius',
  borderEndEndRadius: 'borderRadius',
  borderEndStartRadius: 'borderRadius',
  borderStartEndRadius: 'borderRadius',
  borderStartStartRadius: 'borderRadius',
  // Border widths
  borderBottomWidth: 'borderWidth',
  borderEndWidth: 'borderWidth',
  borderLeftWidth: 'borderWidth',
  borderRightWidth: 'borderWidth',
  borderStartWidth: 'borderWidth',
  borderTopWidth: 'borderWidth',
  borderWidth: 'borderWidth',
};

/**
 * Set of all possible ViewStyle property names
 */
export const viewStyleProps = new Set<string>([
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'backfaceVisibility',
  'borderCurve',
  'borderStyle',
  'cursor',
  'direction',
  'display',
  'elevation',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',
  'overflow',
  'pointerEvents',
  'position',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'transform',
  'transformOrigin',
  'zIndex',
  'backgroundColor',
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockStartColor',
  'borderBottomColor',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'borderColor',
  'borderEndColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderEndWidth',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightWidth',
  'borderStartColor',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStartWidth',
  'borderTopColor',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'columnGap',
  'end',
  'gap',
  'height',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'opacity',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'right',
  'rowGap',
  'shadowColor',
  'start',
  'top',
  'width',
]);

/**
 * Helper function to resolve a theme value
 */
export const resolveThemeValue = (value: any, themeMapping: any): any => {
  if (typeof value !== 'string' || !themeMapping || typeof themeMapping !== 'object') {
    return value;
  }
  const shadeMatch = value.match(/\d+$/);
  if (shadeMatch) {
    const shade = shadeMatch[0];
    const base = value.slice(0, -shade.length);
    const nested = themeMapping[base];
    if (nested && typeof nested === 'object') {
      return nested[shade] ?? value;
    }
  }
  return themeMapping[value] ?? value;
};
