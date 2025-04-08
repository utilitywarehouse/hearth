import React, { forwardRef, memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type BoxProps from './Box.props';

// Helper types for polymorphic components
type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props | 'as'> & {
    as?: T;
  };

// --- Mapping definitions and helper function ---

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

const themeStyleMapping: { [key in keyof ViewStyle]?: string } = {
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
  outlineColor: 'color',
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

const viewStyleProps = new Set<string>([
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

const resolveThemeValue = (value: any, themeMapping: any): any => {
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

// --- Box component definition ---
const BoxComponent = <T extends React.ElementType = typeof View>(
  { as, style, children, ...props }: PolymorphicComponentProps<T, BoxProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const { computedProps } = useMemo(() => {
    const computedProps: Record<string, any> = {};

    Object.entries(props).forEach(([propName, propValue]) => {
      if (propValue === undefined) return;

      if (propStyleMapping[propName] || viewStyleProps.has(propName)) {
        return;
      }

      computedProps[propName] = propValue;
    });

    return { computedProps };
  }, [props]);

  const Component: React.ElementType = as || View;

  console.log('render');

  return (
    <Component ref={ref} style={[styles.computedStyles(props), style]} {...computedProps}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create(theme => ({
  computedStyles: (props: Record<string, any>) => {
    const computedStyles: Record<string, any> = {};

    Object.entries(props).forEach(([propName, propValue]) => {
      if (propValue === undefined) return;

      let stylePropName: keyof ViewStyle | undefined;
      let themeKey: keyof typeof theme | undefined;

      // Handle shorthand props
      if (propStyleMapping[propName]) {
        stylePropName = propStyleMapping[propName];
      }
      // Handle direct style props
      else if (viewStyleProps.has(propName)) {
        stylePropName = propName as keyof ViewStyle;
      }

      if (!stylePropName) return;

      // Resolve theme value if needed
      themeKey = themeStyleMapping[stylePropName] as keyof typeof theme;

      if (themeKey && theme[themeKey]) {
        computedStyles[stylePropName] = resolveThemeValue(propValue, theme[themeKey]);
      } else {
        computedStyles[stylePropName] = propValue;
      }
    });

    return computedStyles;
  },
}));

type BoxComponentType = <T extends React.ElementType = typeof View>(
  props: PolymorphicComponentProps<T, BoxProps<T>> & { ref?: PolymorphicRef<T> }
) => React.ReactElement | null;

const Box = forwardRef(BoxComponent as any) as BoxComponentType & { displayName?: string };
Box.displayName = 'Box';

export default memo(Box);
