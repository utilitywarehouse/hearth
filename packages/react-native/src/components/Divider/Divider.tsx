/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import type DividerProps from './Divider.props';
import { StyleSheet } from 'react-native-unistyles';
import { getFlattenedColorValue } from '../../utils';
import { useTheme } from '../../hooks';

const Divider = forwardRef<View, DividerProps>(
  ({ orientation = 'horizontal', color, space, height, width, flexItem, ...props }, ref) => {
    styles.useVariants({ orientation, space, flexItem });
    const { color: themeColor, colorMode } = useTheme();
    const colorValue = useMemo(() => getFlattenedColorValue(color, themeColor), [color, colorMode]);
    return (
      <View
        ref={ref}
        {...props}
        style={[styles.divider, styles.extraStyles(colorValue, width, height), props.style]}
      />
    );
  }
);

Divider.displayName = 'Divider';

const styles = StyleSheet.create(theme => ({
  divider: {
    backgroundColor: theme.components.divider.color,
    variants: {
      orientation: {
        horizontal: {
          width: '100%',
          height: theme.components.divider.borderWidth,
        },
        vertical: {
          height: '100%',
          width: theme.components.divider.borderWidth,
        },
      },
      space: {
        none: {},
        xs: {},
        sm: {},
        md: {},
        lg: {},
        xl: {},
      },
      flexItem: {
        true: {
          flex: 1,
        },
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        space: 'none',
        styles: {
          marginVertical: 0,
        },
      },
      {
        orientation: 'horizontal',
        space: 'xs',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.xs,
            md: theme.layout.tablet.spacing.xs,
            lg: theme.layout.desktop.spacing.xs,
          },
        },
      },
      {
        orientation: 'horizontal',
        space: 'sm',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.sm,
            md: theme.layout.tablet.spacing.sm,
            lg: theme.layout.desktop.spacing.sm,
          },
        },
      },
      {
        orientation: 'horizontal',
        space: 'md',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.md,
            md: theme.layout.tablet.spacing.md,
            lg: theme.layout.desktop.spacing.md,
          },
        },
      },
      {
        orientation: 'horizontal',
        space: 'lg',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.lg,
            md: theme.layout.tablet.spacing.lg,
            lg: theme.layout.desktop.spacing.lg,
          },
        },
      },
      {
        orientation: 'horizontal',
        space: 'xl',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.xl,
            md: theme.layout.tablet.spacing.xl,
            lg: theme.layout.desktop.spacing.xl,
          },
        },
      },
      {
        orientation: 'vertical',
        space: 'none',
        styles: {
          marginHorizontal: 0,
        },
      },
      {
        orientation: 'vertical',
        space: 'xs',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.xs,
            md: theme.layout.tablet.spacing.xs,
            lg: theme.layout.desktop.spacing.xs,
          },
        },
      },
      {
        orientation: 'vertical',
        space: 'sm',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.sm,
            md: theme.layout.tablet.spacing.sm,
            lg: theme.layout.desktop.spacing.sm,
          },
        },
      },
      {
        orientation: 'vertical',
        space: 'md',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.md,
            md: theme.layout.tablet.spacing.md,
            lg: theme.layout.desktop.spacing.md,
          },
        },
      },
      {
        orientation: 'vertical',
        space: 'lg',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.lg,
            md: theme.layout.tablet.spacing.lg,
            lg: theme.layout.desktop.spacing.lg,
          },
        },
      },
      {
        orientation: 'vertical',
        space: 'xl',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.xl,
            md: theme.layout.tablet.spacing.xl,
            lg: theme.layout.desktop.spacing.xl,
          },
        },
      },
    ],
  },
  extraStyles: (color, width, height) => ({
    ...(color ? { backgroundColor: color } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }),
}));

export default Divider;
