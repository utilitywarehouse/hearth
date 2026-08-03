import type { Ref } from 'react';
import type { TextProps as RNTextProps, Text, TextStyle, ViewStyle } from 'react-native';
import type {
  BackgroundColorValue,
  BorderColorValue,
  IconColorValue,
  TextColorValue,
} from './semanticColorValues';
import type {
  BorderRadiusValue,
  BorderWidthValue,
  ColorValue,
  OpacityValue,
  RawColorValue,
  SpaceValue,
} from './values';

// ─── Margin Props ────────────────────────────────────────────────────────────

export interface MarginProps {
  /** Margin on all sides. Accepts theme space tokens or raw values. */
  margin?: SpaceValue;
  /** Horizontal margin (left and right). */
  marginHorizontal?: SpaceValue;
  /** Vertical margin (top and bottom). */
  marginVertical?: SpaceValue;
  /** Top margin. */
  marginTop?: SpaceValue;
  /** Bottom margin. */
  marginBottom?: SpaceValue;
  /** Left margin. */
  marginLeft?: SpaceValue;
  /** Right margin. */
  marginRight?: SpaceValue;
  /** End margin (logical). */
  marginEnd?: SpaceValue;
  /** Start margin (logical). */
  marginStart?: SpaceValue;
  /** Shorthand: margin on all sides. */
  m?: SpaceValue;
  /** Shorthand: horizontal margin. */
  mx?: SpaceValue;
  /** Shorthand: vertical margin. */
  my?: SpaceValue;
  /** Shorthand: top margin. */
  mt?: SpaceValue;
  /** Shorthand: bottom margin. */
  mb?: SpaceValue;
  /** Shorthand: left margin. */
  ml?: SpaceValue;
  /** Shorthand: right margin. */
  mr?: SpaceValue;
}

// ─── Padding Props ───────────────────────────────────────────────────────────

export interface PaddingProps {
  /** Padding on all sides. Accepts theme space tokens or raw values. */
  padding?: SpaceValue;
  /** Horizontal padding (left and right). */
  paddingHorizontal?: SpaceValue;
  /** Vertical padding (top and bottom). */
  paddingVertical?: SpaceValue;
  /** Top padding. */
  paddingTop?: SpaceValue;
  /** Bottom padding. */
  paddingBottom?: SpaceValue;
  /** Left padding. */
  paddingLeft?: SpaceValue;
  /** Right padding. */
  paddingRight?: SpaceValue;
  /** End padding (logical). */
  paddingEnd?: SpaceValue;
  /** Start padding (logical). */
  paddingStart?: SpaceValue;
  /** Shorthand: padding on all sides. */
  p?: SpaceValue;
  /** Shorthand: horizontal padding. */
  px?: SpaceValue;
  /** Shorthand: vertical padding. */
  py?: SpaceValue;
  /** Shorthand: top padding. */
  pt?: SpaceValue;
  /** Shorthand: bottom padding. */
  pb?: SpaceValue;
  /** Shorthand: left padding. */
  pl?: SpaceValue;
  /** Shorthand: right padding. */
  pr?: SpaceValue;
}

// ─── Spacing (Gap) Props ─────────────────────────────────────────────────────

export interface GapProps {
  /** Gap between child elements. */
  gap?: SpaceValue;
  /** Row gap between child elements. */
  rowGap?: SpaceValue;
  /** Column gap between child elements. */
  columnGap?: SpaceValue;
}

// ─── Size Props ──────────────────────────────────────────────────────────────

export interface SizeProps {
  /** Element height. Accepts theme space tokens or raw values. */
  height?: SpaceValue;
  /** Element width. */
  width?: SpaceValue;
  /** Minimum height. */
  minHeight?: SpaceValue;
  /** Minimum width. */
  minWidth?: SpaceValue;
  /** Maximum height. */
  maxHeight?: SpaceValue;
  /** Maximum width. */
  maxWidth?: SpaceValue;
  /** Shorthand: height. */
  h?: SpaceValue;
  /** Shorthand: width. */
  w?: SpaceValue;
}

// ─── Position Props ──────────────────────────────────────────────────────────

export interface PositionProps {
  /** Position type. */
  position?: ViewStyle['position'];
  /** Top offset. */
  top?: SpaceValue;
  /** Bottom offset. */
  bottom?: SpaceValue;
  /** Left offset. */
  left?: SpaceValue;
  /** Right offset. */
  right?: SpaceValue;
  /** Logical start offset. */
  start?: SpaceValue;
  /** Logical end offset. */
  end?: SpaceValue;
  /** Z-index for stacking order. */
  zIndex?: number;
}

// ─── Background Color Props ──────────────────────────────────────────────────

export interface BackgroundColorProps {
  /** Background color. Accepts simplified semantic background tokens. */
  backgroundColor?: BackgroundColorValue | RawColorValue;
  /** Shorthand: background color. */
  bg?: BackgroundColorValue | RawColorValue;
  /** Shorthand: background color. */
  bgColor?: BackgroundColorValue | RawColorValue;
}

// ─── Border Color Props ──────────────────────────────────────────────────────

export interface BorderColorStyleProps {
  /** Border color. Accepts simplified semantic border tokens. */
  borderColor?: BorderColorValue | RawColorValue;
  /** Bottom border color. */
  borderBottomColor?: BorderColorValue | RawColorValue;
  /** Left border color. */
  borderLeftColor?: BorderColorValue | RawColorValue;
  /** Right border color. */
  borderRightColor?: BorderColorValue | RawColorValue;
  /** Top border color. */
  borderTopColor?: BorderColorValue | RawColorValue;
  /** Block border color. */
  borderBlockColor?: BorderColorValue | RawColorValue;
  /** Block end border color. */
  borderBlockEndColor?: BorderColorValue | RawColorValue;
  /** Block start border color. */
  borderBlockStartColor?: BorderColorValue | RawColorValue;
  /** End border color. */
  borderEndColor?: BorderColorValue | RawColorValue;
  /** Start border color. */
  borderStartColor?: BorderColorValue | RawColorValue;
}

// ─── Border Width Props ──────────────────────────────────────────────────────

export interface BorderWidthProps {
  /** Border width on all sides. */
  borderWidth?: BorderWidthValue;
  /** Bottom border width. */
  borderBottomWidth?: BorderWidthValue;
  /** End border width. */
  borderEndWidth?: BorderWidthValue;
  /** Left border width. */
  borderLeftWidth?: BorderWidthValue;
  /** Right border width. */
  borderRightWidth?: BorderWidthValue;
  /** Start border width. */
  borderStartWidth?: BorderWidthValue;
  /** Top border width. */
  borderTopWidth?: BorderWidthValue;
}

// ─── Border Radius Props ────────────────────────────────────────────────────

export interface BorderRadiusProps {
  /** Border radius on all corners. */
  borderRadius?: BorderRadiusValue;
  /** Bottom-end border radius. */
  borderBottomEndRadius?: BorderRadiusValue;
  /** Bottom-left border radius. */
  borderBottomLeftRadius?: BorderRadiusValue;
  /** Bottom-right border radius. */
  borderBottomRightRadius?: BorderRadiusValue;
  /** Bottom-start border radius. */
  borderBottomStartRadius?: BorderRadiusValue;
  /** Top-end border radius. */
  borderTopEndRadius?: BorderRadiusValue;
  /** Top-left border radius. */
  borderTopLeftRadius?: BorderRadiusValue;
  /** Top-right border radius. */
  borderTopRightRadius?: BorderRadiusValue;
  /** Top-start border radius. */
  borderTopStartRadius?: BorderRadiusValue;
  /** End-end border radius. */
  borderEndEndRadius?: BorderRadiusValue;
  /** End-start border radius. */
  borderEndStartRadius?: BorderRadiusValue;
  /** Start-end border radius. */
  borderStartEndRadius?: BorderRadiusValue;
  /** Start-start border radius. */
  borderStartStartRadius?: BorderRadiusValue;
  /** Shorthand: border radius on all corners. */
  rounded?: BorderRadiusValue;
}

// ─── Border Style Props ─────────────────────────────────────────────────────

export interface BorderStyleProps {
  /** Border style. */
  borderStyle?: ViewStyle['borderStyle'];
  /** Border curve. */
  borderCurve?: ViewStyle['borderCurve'];
}

// ─── Border Props (combined) ─────────────────────────────────────────────────

export interface BorderProps
  extends BorderWidthProps, BorderRadiusProps, BorderColorStyleProps, BorderStyleProps {}

// ─── Flex Layout Props ───────────────────────────────────────────────────────

export interface FlexLayoutProps {
  /** Align content. */
  alignContent?: ViewStyle['alignContent'];
  /** Align items. */
  alignItems?: ViewStyle['alignItems'];
  /** Align self. */
  alignSelf?: ViewStyle['alignSelf'];
  /** Flex value. */
  flex?: number;
  /** Flex basis. */
  flexBasis?: ViewStyle['flexBasis'];
  /** Flex direction. */
  flexDirection?: ViewStyle['flexDirection'];
  /** Flex grow. */
  flexGrow?: number;
  /** Flex shrink. */
  flexShrink?: number;
  /** Flex wrap. */
  flexWrap?: ViewStyle['flexWrap'];
  /** Justify content. */
  justifyContent?: ViewStyle['justifyContent'];
}

// ─── Opacity Props ───────────────────────────────────────────────────────────

export interface OpacityProps {
  /** Opacity value. */
  opacity?: OpacityValue;
}

// ─── Shadow Props ────────────────────────────────────────────────────────────

export interface ShadowProps {
  /** Shadow color. */
  shadowColor?: ColorValue;
  /** Shadow offset. */
  shadowOffset?: ViewStyle['shadowOffset'];
  /** Shadow opacity. */
  shadowOpacity?: number;
  /** Shadow radius. */
  shadowRadius?: number;
  /** Box shadow. */
  boxShadow?: ViewStyle['boxShadow'];
  /** Elevation (Android). */
  elevation?: number;
}

// ─── Outline Props ───────────────────────────────────────────────────────────

export interface OutlineProps {
  /** Outline color. */
  outlineColor?: ColorValue;
  /** Outline offset. */
  outlineOffset?: number;
  /** Outline style. */
  outlineStyle?: ViewStyle['outlineStyle'];
  /** Outline width. */
  outlineWidth?: number;
}

// ─── Display Props ───────────────────────────────────────────────────────────

export interface DisplayProps {
  /** Display type. */
  display?: ViewStyle['display'];
  /** Overflow behavior. */
  overflow?: ViewStyle['overflow'];
  /** Pointer events behavior. */
  pointerEvents?: ViewStyle['pointerEvents'];
  /** Backface visibility. */
  backfaceVisibility?: ViewStyle['backfaceVisibility'];
  /** Cursor type. */
  cursor?: ViewStyle['cursor'];
  /** Direction for bidirectional text. */
  direction?: ViewStyle['direction'];
  /** Aspect ratio. */
  aspectRatio?: ViewStyle['aspectRatio'];
}

// ─── Transform Props ────────────────────────────────────────────────────────

export interface TransformProps {
  /** Transform array. */
  transform?: ViewStyle['transform'];
  /** Transform origin. */
  transformOrigin?: ViewStyle['transformOrigin'];
}

// ─── Text Color Props ────────────────────────────────────────────────────────

export interface TextColorProps {
  /** Text color. Accepts simplified semantic text tokens. */
  color?: TextColorValue;
}

// ─── Icon Color Props ────────────────────────────────────────────────────────

export interface IconColorProps {
  /** Icon color. Accepts simplified semantic icon tokens. */
  iconColor?: IconColorValue;
}

// ─── Common Text Props ───────────────────────────────────────────────────────

/**
 * Common text styling props shared across text components (BodyText, Heading, DetailText).
 * Includes margin utility props, simplified semantic text color, and standard text style props.
 */
export interface CommonTextProps extends RNTextProps, MarginProps, Pick<FlexLayoutProps, 'flexShrink'> {
  /** Whether to truncate text with an ellipsis. */
  truncated?: boolean;
  /** Whether to show strikethrough text. */
  strikeThrough?: boolean;
  /** Whether to underline text. */
  underline?: boolean;
  /** Whether to italicise text. */
  italic?: boolean;
  /** Text color. Accepts simplified semantic text tokens. */
  color?: TextColorValue | RawColorValue;
  /** Text transform (uppercase, lowercase, capitalize). */
  textTransform?: TextStyle['textTransform'];
  /** Text alignment. */
  textAlign?: TextStyle['textAlign'];
  /** Vertical text alignment. */
  textAlignVertical?: TextStyle['textAlignVertical'];
  /** Text decoration line. */
  textDecorationLine?: TextStyle['textDecorationLine'];
  /** Text decoration style. */
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  /** Text decoration color. Accepts any color value. */
  textDecorationColor?: ColorValue;
  /** User select behavior. */
  userSelect?: TextStyle['userSelect'];
  /** Whether to use inverted (light-on-dark) text color. */
  inverted?: boolean;
  /** Ref to the underlying Text element. */
  ref?: Ref<Text>;
}

// ─── Composed Groups ─────────────────────────────────────────────────────────

/** All spacing-related utility props (margin, padding, gap). */
export interface SpacingProps extends MarginProps, PaddingProps, GapProps {}

/** All layout-related utility props (flex, size, position). */
export interface LayoutProps extends FlexLayoutProps, SizeProps, PositionProps {}

/**
 * All Box-level utility style props.
 * This is the full set of style utilities available on Box.
 */
export interface AllUtilityProps
  extends
    SpacingProps,
    LayoutProps,
    BackgroundColorProps,
    BorderProps,
    OpacityProps,
    ShadowProps,
    OutlineProps,
    DisplayProps,
    TransformProps {}
