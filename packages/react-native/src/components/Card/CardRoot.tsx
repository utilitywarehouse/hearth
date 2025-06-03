import React, { forwardRef, ReactNode, useMemo } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CardProps from './Card.props';
import { PressableRef } from '../../types';
import { CardContext } from './Card.context';
import { useStyleProps } from '../../hooks';

// Helper that recursively collects onPress or other defined handlers from descendants
const collectChildActionHandlers = (
  children: React.ReactNode
): Array<(e: GestureResponderEvent) => void> => {
  return React.Children.toArray(children).reduce(
    (handlers, child) => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        if (child.type.displayName === 'CardAction') {
          const actionChildren = React.Children.toArray(child.props.children);
          const actionToInherit = child.props['actionToInherit'] || 'onPress';
          const firstChild = actionChildren[0];
          if (
            React.isValidElement(firstChild) &&
            typeof firstChild.props[actionToInherit] === 'function'
          ) {
            handlers.push(firstChild.props[actionToInherit]);
          }
        }
        if (child.props.children) {
          handlers.push(...collectChildActionHandlers(child.props.children));
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
      style,
      states,
      space,
      disabled = false,
      onPress,
      ...rest
    },
    ref
  ) => {
    const { active } = states || { active: false };
    const childActionHandlers = collectChildActionHandlers(children as ReactNode);
    // Extract style props using our custom hook
    const { computedStyles, remainingProps } = useStyleProps(rest);

    const handlePress = (e: GestureResponderEvent) => {
      if (onPress) {
        onPress(e);
      }

      childActionHandlers.forEach(fn => fn(e));
    };

    const inheritChildAction = childActionHandlers.length > 0;
    const showPressed = inheritChildAction || !!onPress;

    styles.useVariants({
      variant,
      colorScheme,
      noPadding,
      active,
      showPressed,
      disabled,
      space,
    });

    const context = useMemo(
      () => ({
        pressed: showPressed && active,
      }),
      [showPressed, active]
    );
    return (
      <CardContext.Provider value={context}>
        <Pressable
          ref={ref}
          {...remainingProps}
          disabled={disabled}
          style={[styles.card, computedStyles, style as ViewStyle]}
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
    alignItems: 'flex-start',
    borderRadius: theme.components.card.borderRadius,
    variants: {
      space: theme.globalStyle.variants.space,
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
          backgroundColor: theme.components.card.whiteBackgroundColor,
        },
        warmWhite: {
          backgroundColor: theme.components.card.warmWhiteBackgroundColor,
        },
        purple: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        energyBlue: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        broadbandGreen: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        mobileRose: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        insuranceOrange: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        cashbackLilac: {
          borderWidth: theme.components.card.emphasis.borderWidth,
          borderColor: theme.components.card.emphasis.borderColor,
        },
        piggyPink: {
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
    compoundVariants: [
      {
        variant: 'subtle',
        colorScheme: 'purple',
        styles: {
          backgroundColor: theme.components.card.subtle.purpleBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'purple',
        styles: {
          backgroundColor: theme.components.card.emphasis.purpleBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'energyBlue',
        styles: {
          backgroundColor: theme.components.card.subtle.energyBlueBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'energyBlue',
        styles: {
          backgroundColor: theme.components.card.emphasis.energyBlueBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'broadbandGreen',
        styles: {
          backgroundColor: theme.components.card.subtle.broadbandGreenBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'broadbandGreen',
        styles: {
          backgroundColor: theme.components.card.emphasis.broadbandGreenBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'mobileRose',
        styles: {
          backgroundColor: theme.components.card.subtle.mobileRoseBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'mobileRose',
        styles: {
          backgroundColor: theme.components.card.emphasis.mobileRoseBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'insuranceOrange',
        styles: {
          backgroundColor: theme.components.card.subtle.insuranceOrangeBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'insuranceOrange',
        styles: {
          backgroundColor: theme.components.card.emphasis.insuranceOrangeBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'cashbackLilac',
        styles: {
          backgroundColor: theme.components.card.subtle.cashbackLilacBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'cashbackLilac',
        styles: {
          backgroundColor: theme.components.card.emphasis.cashbackLilacBackgroundColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'piggyPink',
        styles: {
          backgroundColor: theme.components.card.subtle.piggyPinkBackgroundColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'piggyPink',
        styles: {
          backgroundColor: theme.components.card.emphasis.piggyPinkBackgroundColor,
        },
      },
    ],
  },
}));

export default Card;
