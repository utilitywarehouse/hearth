import React, { forwardRef, ReactNode, useMemo } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CardProps from './Card.props';
import { PressableRef } from '../../types';
import { CardContext } from './Card.context';

// Helper that recursively collects onPress handlers from descendants
const collectOnPressHandlers = (
  children: React.ReactNode
): Array<(e: GestureResponderEvent) => void> => {
  return React.Children.toArray(children).reduce(
    (handlers, child) => {
      if (React.isValidElement(child)) {
        if (typeof child.props.onPress === 'function') {
          handlers.push(child.props.onPress);
        }
        if (child.props.children) {
          handlers.push(...collectOnPressHandlers(child.props.children));
        }
      }
      return handlers;
    },
    [] as Array<(e: GestureResponderEvent) => void>
  );
};

const Card = forwardRef<
  PressableRef,
  CardProps & { states?: { active?: boolean; disabled?: boolean } }
>(
  (
    {
      children,
      variant = 'subtle',
      colorScheme = 'white',
      noPadding = false,
      selected,
      style,
      states,
      disabled = false,
      inheritChildAction = false,
      onPress,
      ...props
    },
    ref
  ) => {
    const { active } = states || { active: false };
    const showPressed = inheritChildAction || !!onPress;

    styles.useVariants({
      variant,
      colorScheme,
      noPadding,
      selected,
      active,
      showPressed,
      disabled,
    });

    // Recursively gather onPress handlers from descendant children.
    const childOnPressHandlers = inheritChildAction
      ? collectOnPressHandlers(children as ReactNode)
      : [];

    const handlePress = (e: GestureResponderEvent) => {
      if (onPress) {
        onPress(e);
      }
      if (inheritChildAction) {
        childOnPressHandlers.forEach(fn => fn(e));
      }
    };

    const context = useMemo(
      () => ({
        pressed: showPressed && active,
        inheritChildAction,
      }),
      [showPressed, active, inheritChildAction]
    );
    return (
      <CardContext.Provider value={context}>
        <Pressable
          ref={ref}
          {...props}
          disabled={disabled}
          style={[styles.card, style as ViewStyle]}
          onPress={handlePress}
        >
          {children}
        </Pressable>
      </CardContext.Provider>
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
      noPadding: {
        true: {
          padding: theme.components.card.mobile.paddingNone,
        },
        false: {
          padding: {
            base: theme.components.card.mobile.padding,
            md: theme.components.card.tablet.padding,
            lg: theme.components.card.desktop.padding,
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
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default Card;
