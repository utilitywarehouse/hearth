import React, { forwardRef } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CardProps from './Card.props';
import { PressableRef } from '../../types';

const Card = forwardRef<
  PressableRef,
  CardProps & { states?: { active?: boolean; disabled?: boolean } }
>(
  (
    {
      children,
      variant = 'subtle',
      colorScheme = 'white',
      padding = 'lg',
      selected,
      onSelect,
      style,
      states,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { onPress } = props;
    const { active } = states || { active: false };
    const showPressed = !!onPress;

    styles.useVariants({
      variant,
      colorScheme,
      padding,
      selected,
      active,
      showPressed,
      disabled,
    });
    return (
      <Pressable ref={ref} {...props} disabled={disabled} style={[styles.card, style as ViewStyle]}>
        {children}
      </Pressable>
    );
  }
);

Card.displayName = 'Card';

const styles = StyleSheet.create(theme => ({
  card: {
    overflow: 'hidden',
    borderRadius: theme.components.card.borderRadius,
    variants: {
      variant: {
        subtle: {
          borderWidth: theme.components.card.subtle.borderWidth,
          borderColor: theme.components.card.subtle.borderColor,
        },
        emphasis: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
      },
      colorScheme: {
        white: {
          backgroundColor: theme.components.card.white.backgroundColor,
        },
        warmWhite: {
          backgroundColor: theme.components.card.warmWhite.backgroundColor,
        },
        purple: {
          backgroundColor: theme.components.card.purpleBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        energyGreen: {
          backgroundColor: theme.components.card.energyGreenBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        broadbandBlue: {
          backgroundColor: theme.components.card.broadbandBlueBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        mobileRose: {
          backgroundColor: theme.components.card.mobileRoseBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        insuranceOrange: {
          backgroundColor: theme.components.card.insuranceOrangeBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        cashbackLilac: {
          backgroundColor: theme.components.card.cashbackLilacBackgroundColor,
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
      },
      padding: {
        lg: {
          paddingHorizontal: {
            base: theme.components.card.mobile.lg.paddingHorizontal,
            md: theme.components.card.tablet.lg.paddingHorizontal,
            lg: theme.components.card.desktop.lg.paddingHorizontal,
          },
          paddingVertical: {
            base: theme.components.card.mobile.lg.paddingVertical,
            md: theme.components.card.tablet.lg.paddingVertical,
            lg: theme.components.card.desktop.lg.paddingVertical,
          },
        },
        md: {
          paddingHorizontal: {
            base: theme.components.card.mobile.md.paddingHorizontal,
            md: theme.components.card.tablet.md.paddingHorizontal,
            lg: theme.components.card.desktop.md.paddingHorizontal,
          },
          paddingVertical: {
            base: theme.components.card.mobile.md.paddingVertical,
            md: theme.components.card.tablet.md.paddingVertical,
            lg: theme.components.card.desktop.md.paddingVertical,
          },
        },
        sm: {
          paddingHorizontal: {
            base: theme.components.card.mobile.sm.paddingHorizontal,
            md: theme.components.card.tablet.sm.paddingHorizontal,
            lg: theme.components.card.desktop.sm.paddingHorizontal,
          },
          paddingVertical: {
            base: theme.components.card.mobile.sm.paddingVertical,
            md: theme.components.card.tablet.sm.paddingVertical,
            lg: theme.components.card.desktop.sm.paddingVertical,
          },
        },
        none: {
          paddingHorizontal: {
            base: theme.components.card.mobile.none.paddingHorizontal,
            md: theme.components.card.tablet.none.paddingHorizontal,
            lg: theme.components.card.desktop.none.paddingHorizontal,
          },
          paddingVertical: {
            base: theme.components.card.mobile.none.paddingVertical,
            md: theme.components.card.tablet.none.paddingVertical,
            lg: theme.components.card.desktop.none.paddingVertical,
          },
        },
      },
      selected: {
        true: {
          borderWidth: theme.components.card.borderWidthSelected,
          borderColor: theme.components.card.borderColorSelected,
          margin: -theme.components.card.borderWidthSelected / 2,
        },
      },
      active: {
        true: {},
      },
      showPressed: {
        true: {},
        false: {
          cursor: 'auto',
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
    compoundVariants: [
      {
        showPressed: true,
        colorScheme: 'white',
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.card.white.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.card.white.backgroundColorActive,
            },
            '_focus-visible': {
              //   ...theme.helpers.focuseVisible,
            },
          },
        },
      },
      {
        showPressed: true,
        active: true,
        colorScheme: 'white',
        styles: {
          backgroundColor: theme.components.card.white.backgroundColorActive,
        },
      },
      {
        showPressed: true,
        colorScheme: 'warmWhite',
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.card.warmWhite.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.card.warmWhite.backgroundColorActive,
            },
            '_focus-visible': {
              //   ...theme.helpers.focuseVisible,
            },
          },
        },
      },
      {
        showPressed: true,
        active: true,
        colorScheme: 'warmWhite',
        styles: {
          backgroundColor: theme.components.card.warmWhite.backgroundColorActive,
        },
      },
    ],
  },
}));

export default Card;
