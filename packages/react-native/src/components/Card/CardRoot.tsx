import React, { ReactNode, useMemo } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import { CardContext } from './Card.context';
import CardProps from './Card.props';

// Helper that recursively collects onPress or other defined handlers from descendants
const collectChildActionHandlers = (
  children: React.ReactNode
): Array<(e: GestureResponderEvent) => void> =>
  React.Children.toArray(children).reduce(
    (handlers, child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as any;
        // @ts-expect-error - type
        if (child.type.displayName === 'CardAction') {
          const actionChildren = React.Children.toArray(childProps.children);
          const actionToInherit = childProps['actionToInherit'] || 'onPress';
          const firstChild = actionChildren[0];
          if (
            React.isValidElement(firstChild) &&
            typeof (firstChild.props as any)[actionToInherit] === 'function'
          ) {
            handlers.push((firstChild.props as any)[actionToInherit]);
          }
        }
        if (childProps.children) {
          handlers.push(...collectChildActionHandlers(childProps.children));
        }
      }
      return handlers;
    },
    [] as Array<(e: GestureResponderEvent) => void>
  );

const Card = ({
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
}: CardProps & { states?: { active?: boolean; disabled?: boolean } }) => {
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
        {...remainingProps}
        disabled={disabled}
        style={[styles.card, computedStyles, style as ViewStyle]}
        onPress={handlePress}
      >
        {children}
      </Pressable>
    </CardContext.Provider>
  );
};

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
          borderWidth: theme.components.card.neutral.subtle.borderWidth,
          borderColor: theme.components.card.neutral.subtle.borderColor,
        },
        emphasis: {
          borderWidth: theme.components.card.neutral.emphasis.borderWidth,
          borderColor: theme.components.card.neutral.emphasis.borderColor,
        },
      },
      colorScheme: {
        white: {
          backgroundColor: theme.components.card.neutral.whiteBackgroundColor,
        },
        warmWhite: {
          backgroundColor: theme.components.card.neutral.warmWhiteBackgroundColor,
        },
        purple: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        energyBlue: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        broadbandGreen: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        mobileRose: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        insuranceOrange: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        cashbackLilac: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        piggyPink: {
          borderWidth: theme.components.card.brand.borderWidth,
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
          backgroundColor: theme.components.card.brand.subtle.purpleBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'purple',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.purpleBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'energyBlue',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.energyBlueBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'energyBlue',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.energyBlueBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'broadbandGreen',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.broadbandGreenBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'broadbandGreen',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.broadbandGreenBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'mobileRose',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.mobileRoseBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'mobileRose',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.mobileRoseBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'insuranceOrange',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.insuranceOrangeBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'insuranceOrange',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.insuranceOrangeBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'cashbackLilac',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.cashbackLilacBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'cashbackLilac',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.cashbackLilacBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'piggyPink',
        styles: {
          backgroundColor: theme.components.card.brand.subtle.piggyPinkBackgroundColor,
          borderColor: theme.components.card.brand.subtle.borderColor,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'piggyPink',
        styles: {
          backgroundColor: theme.components.card.brand.emphasis.piggyPinkBackgroundColor,
          borderColor: theme.components.card.brand.emphasis.borderColor,
        },
      },
    ],
  },
}));

export default Card;
