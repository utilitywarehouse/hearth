import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import {
  propStyleMapping,
  resolveThemeKey,
  resolveThemeValueWithFallback,
  semanticPropMapping,
  themeStyleFallbackMapping,
  themeStyleMapping,
  viewStyleProps,
} from '../../utils';
import type BoxProps from './Box.props';

// --- Box component definition ---
const BoxComponent = ({ as, style, children, ...props }: BoxProps) => {
  const { computedProps } = useMemo(() => {
    const computedProps: Record<string, any> = {};

    Object.entries(props).forEach(([propName, propValue]) => {
      if (propValue === undefined) return;

      if (semanticPropMapping[propName]) return;
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

      // Check for semantic prop mappings first (e.g., iconColor, color)
      const semanticMapping = semanticPropMapping[propName];
      if (semanticMapping) {
        const { styleProp, themeKey } = semanticMapping;
        const themeMapping = resolveThemeKey(theme, themeKey);
        const fallbackKey = themeStyleFallbackMapping[themeKey];
        const fallbackMapping = fallbackKey ? resolveThemeKey(theme, fallbackKey) : undefined;

        computedStyles[styleProp] = resolveThemeValueWithFallback(
          propValue,
          themeMapping,
          fallbackMapping
        );
        return;
      }

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
      const themeKey = themeStyleMapping[stylePropName as string];

      if (themeKey) {
        const themeObj = resolveThemeKey(theme, themeKey);
        const fallbackKey = themeStyleFallbackMapping[themeKey];
        const fallbackMapping = fallbackKey ? resolveThemeKey(theme, fallbackKey) : undefined;

        if (themeObj) {
          computedStyles[stylePropName] = resolveThemeValueWithFallback(
            propValue,
            themeObj,
            fallbackMapping
          );
        } else {
          computedStyles[stylePropName] = propValue;
        }
      } else {
        computedStyles[stylePropName] = propValue;
      }
    });

    return computedStyles;
  },
}));

BoxComponent.displayName = 'Box';

export default BoxComponent;
