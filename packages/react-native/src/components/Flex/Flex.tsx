import React, { forwardRef } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import FlexProps from './Flex.props';

const Flex = forwardRef<View, FlexProps>(
  ({
    style,
    children,
    direction = 'column',
    align = 'flex-start',
    justify = 'flex-start',
    wrap = 'nowrap',
    space = 'md',
    ...rest
  }) => {
    const propStyle: ViewStyle = {
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
    };

    styles.useVariants({ space });

    return (
      <View style={[propStyle, styles.flex, style]} {...rest}>
        {children}
      </View>
    );
  }
);

Flex.displayName = 'Flex';

const styles = StyleSheet.create(theme => ({
  flex: {
    display: 'flex',
    variants: {
      space: {
        none: {},
        xs: {
          gap: {
            base: theme.layout.mobile.spacing.xs,
            md: theme.layout.tablet.spacing.xs,
            lg: theme.layout.desktop.spacing.xs,
          },
        },
        sm: {
          gap: {
            base: theme.layout.mobile.spacing.sm,
            md: theme.layout.tablet.spacing.sm,
            lg: theme.layout.desktop.spacing.sm,
          },
        },
        md: {
          gap: {
            base: theme.layout.mobile.spacing.md,
            md: theme.layout.tablet.spacing.md,
            lg: theme.layout.desktop.spacing.md,
          },
        },
        lg: {
          gap: {
            base: theme.layout.mobile.spacing.lg,
            md: theme.layout.tablet.spacing.lg,
            lg: theme.layout.desktop.spacing.lg,
          },
        },
        xl: {
          gap: {
            base: theme.layout.mobile.spacing.xl,
            md: theme.layout.tablet.spacing.xl,
            lg: theme.layout.desktop.spacing.xl,
          },
        },
      },
    },
  },
}));

export default Flex;
