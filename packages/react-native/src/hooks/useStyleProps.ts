import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import {
  propStyleMapping,
  resolveThemeKey,
  resolveThemeValueWithFallback,
  semanticPropMapping,
  themeStyleFallbackMapping,
  themeStyleMapping,
  viewStyleProps,
} from '../utils';
import useTheme from './useTheme';

/**
 * Type for the return value from useStyleProps
 */
interface StylePropsResult {
  /** The computed styles based on the input props */
  computedStyles: Record<string, any>;
  /** Props that are not style related and should be passed to the component */
  remainingProps: Record<string, any>;
}

/**
 * Hook to process utility style props and resolve theme values
 * @param props Component props to process
 * @returns Object containing computed styles and non-style props
 */
export const useStyleProps = (props: Record<string, any>): StylePropsResult => {
  const theme = useTheme();

  return useMemo(() => {
    const computedStyles: Record<string, any> = {};
    const remainingProps: Record<string, any> = {};

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

      if (stylePropName) {
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
      } else {
        // This prop is not style related, keep it
        remainingProps[propName] = propValue;
      }
    });

    return { computedStyles, remainingProps };
  }, [props, theme]);
};
