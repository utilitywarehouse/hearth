import React, { ReactNode, useMemo } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import { CardContext } from './Card.context';
import CardProps from './Card.props';
import CardContent from './CardContent';

// Helper to check if children contain specific component types
const checkForComponentType = (children: React.ReactNode, displayName: string): boolean => {
  return React.Children.toArray(children).some(child => {
    if (React.isValidElement(child)) {
      // @ts-expect-error - type
      if (child.type.displayName === displayName) {
        return true;
      }
      const childProps = child.props as any;
      if (childProps.children) {
        return checkForComponentType(childProps.children, displayName);
      }
    }
    return false;
  });
};

// Helper to filter out specific component types from children
const filterChildren = (children: React.ReactNode, excludeDisplayName: string): React.ReactNode => {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-expect-error - type
      if (child.type.displayName === excludeDisplayName) {
        return null;
      }
      const childProps = child.props as any;
      if (childProps.children) {
        return React.cloneElement(child, {
          ...childProps,
          children: filterChildren(childProps.children, excludeDisplayName),
        });
      }
    }
    return child;
  });
};

// Helper to extract specific component types from children
const extractChildren = (
  children: React.ReactNode,
  includeDisplayName: string,
  markFirst = false
): React.ReactNode => {
  let isFirstFound = false;
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-expect-error - type
      if (child.type.displayName === includeDisplayName) {
        const isFirst = markFirst && !isFirstFound;
        if (isFirst) {
          isFirstFound = true;
        }
        return markFirst
          ? React.cloneElement(child, { ...(child.props || {}), isFirst } as any)
          : child;
      }
      const childProps = child.props as any;
      if (childProps.children) {
        return extractChildren(childProps.children, includeDisplayName, markFirst);
      }
    }
    return null;
  });
};

// Helper that recursively collects onPress or other defined handlers from descendants
const collectChildActionHandlers = (
  children: React.ReactNode
): Array<(e: GestureResponderEvent) => void> =>
  React.Children.toArray(children).reduce(
    (handlers, child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as any;
        // @ts-expect-error - type
        if (child.type.displayName === 'CardPressHandler') {
          const actionChildren = React.Children.toArray(childProps.children);
          const handlerToInherit = childProps['handlerToInherit'] || 'onPress';
          const firstChild = actionChildren[0];
          if (
            React.isValidElement(firstChild) &&
            typeof (firstChild.props as any)[handlerToInherit] === 'function'
          ) {
            handlers.push((firstChild.props as any)[handlerToInherit]);
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
  const hasActions = checkForComponentType(children as ReactNode, 'CardAction');
  const hasContent = checkForComponentType(children as ReactNode, 'CardContent');
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

  const filteredChildren =
    !hasContent && hasActions ? filterChildren(children as ReactNode, 'CardAction') : null;

  // Check if there's any content besides CardActions
  const hasOnlyActions =
    hasActions &&
    !hasContent &&
    React.Children.toArray(filteredChildren).filter(child => child != null).length === 0;

  const filteredCardActions =
    !hasContent && hasActions
      ? extractChildren(children as ReactNode, 'CardAction', hasOnlyActions)
      : null;

  const context = useMemo(
    () => ({
      pressed: showPressed && active,
      noPadding,
      hasActions,
      hasContent,
      hasOnlyActions,
      space,
      variant,
    }),
    [showPressed, active, hasActions, hasContent, hasOnlyActions, noPadding, space, variant]
  );

  styles.useVariants({
    variant,
    colorScheme,
    noPadding: noPadding || hasActions || hasContent,
    active,
    showPressed,
    disabled,
    space: hasActions || hasContent ? 'none' : space,
  });

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
        {!hasContent && hasActions ? (
          hasOnlyActions ? (
            (filteredCardActions as ReactNode)
          ) : filteredChildren ? (
            <>
              <CardContent>{filteredChildren as ReactNode}</CardContent>
              {filteredCardActions as ReactNode}
            </>
          ) : (
            (children as ReactNode)
          )
        ) : (
          (children as ReactNode)
        )}
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
