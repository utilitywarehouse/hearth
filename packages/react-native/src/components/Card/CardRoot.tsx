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
  colorScheme = 'neutralStrong',
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
        accessible={showPressed}
        importantForAccessibility={showPressed ? 'yes' : 'no'}
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
          borderColor: theme.color.border.subtle,
        },
        emphasis: {
          borderWidth: theme.components.card.neutral.emphasis.borderWidth,
          borderColor: theme.color.border.strong,
        },
      },
      colorScheme: {
        neutralStrong: {
          backgroundColor: theme.color.surface.neutral.strong,
        },
        neutralSubtle: {
          backgroundColor: theme.color.surface.neutral.subtle,
        },
        brand: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        energy: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        broadband: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        mobile: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        insurance: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        cashback: {
          borderWidth: theme.components.card.brand.borderWidth,
        },
        pig: {
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
        colorScheme: 'brand',
        styles: {
          backgroundColor: theme.color.surface.brand.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'brand',
        styles: {
          backgroundColor: theme.color.surface.brand.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'energy',
        styles: {
          backgroundColor: theme.color.surface.energy.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'energy',
        styles: {
          backgroundColor: theme.color.surface.energy.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'broadband',
        styles: {
          backgroundColor: theme.color.surface.broadband.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'broadband',
        styles: {
          backgroundColor: theme.color.surface.broadband.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'mobile',
        styles: {
          backgroundColor: theme.color.surface.mobile.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'mobile',
        styles: {
          backgroundColor: theme.color.surface.mobile.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'insurance',
        styles: {
          backgroundColor: theme.color.surface.insurance.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'insurance',
        styles: {
          backgroundColor: theme.color.surface.insurance.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'cashback',
        styles: {
          backgroundColor: theme.color.surface.cashback.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'cashback',
        styles: {
          backgroundColor: theme.color.surface.cashback.default,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'pig',
        styles: {
          backgroundColor: theme.color.surface.pig.subtle,
          borderColor: theme.color.border.strong,
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'pig',
        styles: {
          backgroundColor: theme.color.surface.pig.default,
          borderColor: theme.color.border.strong,
        },
      },
    ],
  },
}));

export default Card;
