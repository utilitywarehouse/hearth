import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { isStyleProp, resolveStyleProps } from '../../utils';
import type BoxProps from './Box.props';

// --- Box component definition ---
const BoxComponent = ({ as, style, children, ...props }: BoxProps) => {
  // Only style props may be passed to the dynamic function below: Unistyles
  // hands dynamic function arguments to C++, which requires them to be
  // serializable (no callbacks or other host objects).
  const styleProps: Record<string, any> = {};
  const forwardedProps: Record<string, any> = {};

  for (const propName in props) {
    const propValue = (props as Record<string, any>)[propName];
    if (propValue === undefined) continue;

    if (isStyleProp(propName)) {
      styleProps[propName] = propValue;
    } else {
      forwardedProps[propName] = propValue;
    }
  }

  const Component: React.ComponentType<any> = (as as React.ComponentType<any>) || View;

  return (
    <Component style={[styles.computedStyles(styleProps), style]} {...forwardedProps}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create(theme => ({
  computedStyles: (styleProps: Record<string, any>) => resolveStyleProps(styleProps, theme),
}));

BoxComponent.displayName = 'Box';

export default BoxComponent;
