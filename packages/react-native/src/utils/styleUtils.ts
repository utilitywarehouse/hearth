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
 * Mapping of style props to their theme category.
 *
 * - `backgroundColor` maps to `theme.helpers.semanticColor.background` (simplified semantic background tokens)
 *   with fallback to `theme.color` for full color values
 * - `borderColor` (and variants) maps to `theme.helpers.semanticColor.border` (simplified semantic border tokens)
 *   with fallback to `theme.color` for full color values
 * - Other color props (shadowColor, outlineColor) still map to the full `theme.color` object
 */
export const themeStyleMapping: { [key: string]: string } = {
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
  // Semantic background color (simplified keys: 'brand', 'primary', 'secondary')
  backgroundColor: 'helpers.semanticColor.background',
  // Semantic border colors (simplified keys: 'strong', 'subtle')
  borderColor: 'helpers.semanticColor.border',
  borderBottomColor: 'helpers.semanticColor.border',
  borderLeftColor: 'helpers.semanticColor.border',
  borderRightColor: 'helpers.semanticColor.border',
  borderTopColor: 'helpers.semanticColor.border',
  borderBlockColor: 'helpers.semanticColor.border',
  borderBlockEndColor: 'helpers.semanticColor.border',
  borderBlockStartColor: 'helpers.semanticColor.border',
  borderEndColor: 'helpers.semanticColor.border',
  borderStartColor: 'helpers.semanticColor.border',
  // Other colors (still use the full color object for flexibility)
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
 * Mapping of theme categories to their fallback categories.
 * When a value isn't found in the primary theme category, the fallback is tried.
 * This ensures backward compatibility with full color values.
 */
export const themeStyleFallbackMapping: { [key: string]: string } = {
  'helpers.semanticColor.background': 'color',
  'helpers.semanticColor.border': 'color',
  'helpers.semanticColor.text': 'color',
  'helpers.semanticColor.icon': 'color',
};

/**
 * Mapping of custom semantic prop names to their style prop + theme category.
 * These are props that don't correspond 1:1 with ViewStyle keys.
 */
export const semanticPropMapping: { [key: string]: { styleProp: string; themeKey: string } } = {
  /** Maps iconColor prop -> resolves against theme.helpers.semanticColor.icon (semantic icon tokens) */
  iconColor: { styleProp: 'color', themeKey: 'helpers.semanticColor.icon' },
  /** Maps color prop -> resolves against theme.helpers.semanticColor.text (semantic text tokens) */
  color: { styleProp: 'color', themeKey: 'helpers.semanticColor.text' },
};

/**
 * Set of all possible ViewStyle property names
 */
export const viewStyleProps = new Set<string>([
  // Display & Misc
  'backfaceVisibility',
  'cursor',
  'direction',
  'display',
  'opacity',
  'overflow',
  'pointerEvents',

  // Flex & Alignment
  'alignContent',
  'alignItems',
  'alignSelf',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',

  // Spacing (Margin, Padding & Gaps)
  'columnGap',
  'gap',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'rowGap',

  // Colors (Background & Border Colors)
  'backgroundColor',
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockStartColor',
  'borderBottomColor',
  'borderColor',
  'borderEndColor',
  'borderLeftColor',
  'borderRightColor',
  'borderStartColor',
  'borderTopColor',

  // Borders (Widths, Radii & Style) & Outline
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'borderCurve',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRadius',
  'borderRightWidth',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStartWidth',
  'borderStyle',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderWidth',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',

  // Elevation & Shadow
  'boxShadow',
  'elevation',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',

  // Size
  'aspectRatio',
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',

  // Positioning
  'bottom',
  'end',
  'left',
  'position',
  'right',
  'start',
  'top',

  // Transform
  'transform',
  'transformOrigin',

  // Z-index
  'zIndex',
]);
