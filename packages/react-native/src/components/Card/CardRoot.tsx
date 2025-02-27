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
    });
    return (
      <Pressable ref={ref} {...props} style={[styles.card, style as ViewStyle]}>
        {children}
      </Pressable>
    );
  }
);

Card.displayName = 'Card';

const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.xl,
    variants: {
      variant: {
        subtle: {},
        emphasis: {},
      },
      colorScheme: {
        white: {},
        'warm white': {},
        purple: {},
        'energy green': {},
        'broadband blue': {},
        'mobile rose': {},
        'insurance orange': {},
        'cashback lilac': {},
      },
      padding: {
        lg: {},
        md: {},
        sm: {},
        none: {},
      },
      selected: {
        true: {},
      },
      active: {
        true: {},
      },
      showPressed: {
        true: {},
      },
    },
    compoundVariants: [],
  },
}));

export default Card;
