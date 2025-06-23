 
import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type BoxProps from './Box.props';
import {
  propStyleMapping,
  resolveThemeValue,
  themeStyleMapping,
  viewStyleProps,
} from '../../utils';

// --- Box component definition ---
const BoxComponent = ({ as, style, children, ...props }: BoxProps) => {
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

  const Component: React.ComponentType<any> = (as as React.ComponentType<any>) || View;

  return (
    <Component style={[styles.computedStyles(props), style]} {...computedProps}>
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
      const themeKey: keyof typeof theme | undefined = themeStyleMapping[
        stylePropName
      ] as keyof typeof theme;

      if (themeKey && theme[themeKey]) {
        computedStyles[stylePropName] = resolveThemeValue(propValue, theme[themeKey]);
      } else {
        computedStyles[stylePropName] = propValue;
      }
    });

    return computedStyles;
  },
}));

BoxComponent.displayName = 'Box';

export default BoxComponent;
