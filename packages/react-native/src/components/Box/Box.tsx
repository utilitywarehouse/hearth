/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { UnistylesThemes, useUnistyles } from 'react-native-unistyles';
import type BoxProps from './Box.props';

const propStyleMapping: { [key: string]: keyof ViewStyle } = {
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  bg: 'backgroundColor',
  bgColor: 'backgroundColor',
  h: 'height',
  w: 'width',
  rounded: 'borderRadius',
};

const themeStyleMapping: { [key in keyof ViewStyle]?: keyof UnistylesThemes['light'] } = {
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
  shadowColor: 'color',
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
  borderBottomWidth: 'borderWidth',
  borderEndWidth: 'borderWidth',
  borderLeftWidth: 'borderWidth',
  borderRightWidth: 'borderWidth',
  borderStartWidth: 'borderWidth',
  borderTopWidth: 'borderWidth',
  borderWidth: 'borderWidth',
};

// Create a single set for all view style properties
const viewStyleProps = new Set<string>([
  // Style props that don't need theme resolution
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
  // Theme-resolvable style props
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
 * Resolves a value against the theme if applicable
 */
const resolveThemeValue = (value: any, themeMapping: any): any => {
  if (typeof value !== 'string' || !themeMapping || typeof themeMapping !== 'object') {
    return value;
  }

  // Look for colour values by detecting the last number in the string
  const shadeMatch = value.match(/\d+$/);
  if (shadeMatch) {
    const shade = shadeMatch[0];
    const base = value.slice(0, -shade.length);
    const nested = themeMapping[base];
    if (nested && typeof nested === 'object') {
      return nested[shade] ?? value;
    }
  }

  // Otherwise if themeMapping has a direct mapping
  return themeMapping[value] ?? value;
};

const BoxComponent = <T extends React.ElementType = typeof View>(
  { as, style, children, ...props }: BoxProps<T>,
  ref: React.Ref<any>
) => {
  const { theme } = useUnistyles();

  // Memoize styles processing to prevent unnecessary recalculations
  const { styles, componentProps } = useMemo(() => {
    const computedStyles: Partial<ViewStyle> = {};
    const computedProps: Record<string, any> = {};

    // Process all props in a single pass
    for (const propName in props) {
      const propValue = props[propName as keyof typeof props];

      // Skip undefined values
      if (propValue === undefined) continue;

      // Check if it's a mapped shorthand prop
      if (propStyleMapping[propName]) {
        const stylePropName = propStyleMapping[propName];
        const themeKey = themeStyleMapping[stylePropName];

        if (themeKey) {
          const themeMapping = theme[themeKey];
          computedStyles[stylePropName] = resolveThemeValue(propValue, themeMapping);
        } else {
          computedStyles[stylePropName] = propValue;
        }
        continue;
      }

      // Check if it's a direct style property
      if (viewStyleProps.has(propName)) {
        const stylePropName = propName as keyof ViewStyle;
        const themeKey = themeStyleMapping[stylePropName];

        if (themeKey) {
          const themeMapping = theme[themeKey];
          computedStyles[stylePropName] = resolveThemeValue(propValue, themeMapping);
        } else {
          computedStyles[stylePropName] = propValue;
        }
        continue;
      }

      // If not a style prop, it's a component prop
      computedProps[propName] = propValue;
    }

    return { styles: computedStyles, componentProps: computedProps };
  }, [props, theme]);

  const Component = as || View;

  return (
    <Component ref={ref} style={[styles, style]} {...componentProps}>
      {children}
    </Component>
  );
};

const ForwardedBox = forwardRef<View, BoxProps>(BoxComponent);

ForwardedBox.displayName = 'Box';

export default memo(ForwardedBox);
