import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';
import type DividerProps from './Divider.props';

const Divider = ({
  orientation = 'horizontal',
  color,
  spacing,
  space,
  height,
  width,
  flexItem,
  ...props
}: DividerProps) => {
  styles.useVariants({ orientation, spacing: space ?? spacing, flexItem });
  const { color: themeColor, colorMode } = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colorValue = useMemo(() => getFlattenedColorValue(color, themeColor), [color, colorMode]);
  return (
    <View
      {...props}
      style={[styles.divider, styles.extraStyles(colorValue, width, height), props.style]}
    />
  );
};

Divider.displayName = 'Divider';

const styles = StyleSheet.create(theme => ({
  divider: {
    backgroundColor: theme.components.divider.color,
    variants: {
      orientation: {
        horizontal: {
          width: '100%',
          height: theme.components.divider.size,
        },
        vertical: {
          height: '100%',
          width: theme.components.divider.size,
        },
      },
      spacing: {
        none: {},
        '2xs': {},
        xs: {},
        sm: {},
        md: {},
        lg: {},
        xl: {},
        '2xl': {},
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
        spacing: 'none',
        styles: {
          marginVertical: 0,
        },
      },
      {
        orientation: 'horizontal',
        spacing: '2xs',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing['2xs'],
            md: theme.layout.tablet.spacing['2xs'],
            lg: theme.layout.desktop.spacing['2xs'],
          },
        },
      },
      {
        orientation: 'horizontal',
        spacing: 'xs',
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
        spacing: 'sm',
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
        spacing: 'md',
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
        spacing: 'lg',
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
        spacing: 'xl',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing.xl,
            md: theme.layout.tablet.spacing.xl,
            lg: theme.layout.desktop.spacing.xl,
          },
        },
      },
      {
        orientation: 'horizontal',
        spacing: '2xl',
        styles: {
          marginVertical: {
            base: theme.layout.mobile.spacing['2xl'],
            md: theme.layout.tablet.spacing['2xl'],
            lg: theme.layout.desktop.spacing['2xl'],
          },
        },
      },
      {
        orientation: 'vertical',
        spacing: 'none',
        styles: {
          marginHorizontal: 0,
        },
      },
      {
        orientation: 'vertical',
        spacing: '2xs',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing['2xs'],
            md: theme.layout.tablet.spacing['2xs'],
            lg: theme.layout.desktop.spacing['2xs'],
          },
        },
      },
      {
        orientation: 'vertical',
        spacing: 'xs',
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
        spacing: 'sm',
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
        spacing: 'md',
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
        spacing: 'lg',
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
        spacing: 'xl',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing.xl,
            md: theme.layout.tablet.spacing.xl,
            lg: theme.layout.desktop.spacing.xl,
          },
        },
      },
      {
        orientation: 'vertical',
        spacing: '2xl',
        styles: {
          marginHorizontal: {
            base: theme.layout.mobile.spacing['2xl'],
            md: theme.layout.tablet.spacing['2xl'],
            lg: theme.layout.desktop.spacing['2xl'],
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
