import React, { forwardRef, memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type BoxProps from './Box.props';
import {
  propStyleMapping,
  resolveThemeValue,
  themeStyleMapping,
  viewStyleProps,
} from '../../utils';

// Helper types for polymorphic components
type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props | 'as'> & {
    as?: T;
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

const Box = memo(forwardRef(BoxComponent as any) as BoxComponentType & { displayName?: string });

Box.displayName = 'Box';

export default Box;
