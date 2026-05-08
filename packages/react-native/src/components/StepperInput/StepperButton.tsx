import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import type { ComponentType } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';

type StepperButtonProps = {
  icon: ComponentType;
  disabled?: boolean;
} & Omit<PressableProps, 'children'>;

const StepperButtonRoot = ({
  icon,
  disabled,
  states,
  ...props
}: StepperButtonProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const isDisabled = disabled ?? states?.disabled ?? false;
  const isActive = states?.active ?? false;

  styles.useVariants({ active: isActive, disabled: isDisabled });

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, ...props.accessibilityState }}
      disabled={isDisabled}
      style={[styles.button, props.style as ViewStyle]}
    >
      <Icon as={icon} size="sm" style={styles.icon} />
    </Pressable>
  );
};

const StepperButton: React.ComponentType<React.ComponentProps<typeof StepperButtonRoot>> = createPressable({ Root: StepperButtonRoot }) as unknown as React.ComponentType<React.ComponentProps<typeof StepperButtonRoot>>;

StepperButton.displayName = 'StepperButton';

const styles = StyleSheet.create(theme => ({
  button: {
    width: theme.components.iconButton.md.width,
    height: theme.components.iconButton.md.height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.components.input.borderRadius,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    backgroundColor: theme.color.surface.neutral.strong,
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: 2,
      },
    },
    variants: {
      active: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  icon: {
    color: theme.color.icon.primary,
  },
}));

export default StepperButton;
