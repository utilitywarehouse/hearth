import { useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCardPressHandlerContext } from '../Card';
import { ButtonContext } from './Button.context';
import type { BaseButtonProps } from './Button.props';

const ButtonRoot = ({
  children,
  colorScheme = 'highlight',
  variant = 'solid',
  size = 'md',
  inverted = false,
  states,
  onPress,
  paddingNone = false,
  ...props
}: BaseButtonProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active, disabled = false } = states || {};
  const { pressed } = useCardPressHandlerContext();

  styles.useVariants({
    variant,
    size,
    colorScheme,
    disabled,
    inverted,
    active: active || pressed,
    paddingNone,
  });

  const value = useMemo(
    () => ({ colorScheme, variant, size, inverted, disabled, active }),
    [colorScheme, variant, size, inverted, disabled, active]
  );
  return (
    <ButtonContext.Provider value={value}>
      <Pressable {...props} style={[styles.container, props.style as ViewStyle]} onPress={onPress}>
        {children}
      </Pressable>
    </ButtonContext.Provider>
  );
};

ButtonRoot.displayName = 'ButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.components.button.borderWidth,
    borderRadius: theme.components.button.borderRadius,
    gap: theme.components.button.gap,
    minWidth: theme.components.button.minWidth,
    _web: {
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: 1,
        boxShadow: 'none',
      },
    },
    variants: {
      colorScheme: {
        highlight: {},
        affirmative: {},
        destructive: {},
        functional: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      inverted: {
        true: {
          _web: {
            '_focus-visible': {
              outlineColor: theme.color.focus.inverted,
            },
          },
        },
      },
      active: {
        true: {},
      },
      variant: {
        emphasis: {
          borderColor: theme.color.interactive.highlight.border.strong,
          boxShadow: `${theme.shadow.mobile.sm.x}px ${theme.shadow.mobile.sm.y}px ${theme.shadow.mobile.sm.spread}px ${theme.color.shadow.default}`,
        },
        solid: {
          borderColor: theme.color.interactive.highlight.border.strong,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 2,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          textDecoration: 'underline',
        },
      },
      size: {
        sm: {
          paddingVertical: theme.components.button.sm.paddingVertical,
          paddingHorizontal: theme.components.button.sm.paddingHorizontal,
          minHeight: 32,
        },
        md: {
          paddingVertical: theme.components.button.md.paddingVertical,
          paddingHorizontal: theme.components.button.md.paddingHorizontal,
          minHeight: 48,
        },
      },
      paddingNone: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // Padding None
      {
        size: 'sm',
        paddingNone: true,
        variant: 'ghost',
        styles: {
          paddingHorizontal: 0,
        },
      },
      // Variant Color Schemes
      // Emphasis
      // Emphasis Yellow
      {
        variant: 'emphasis',
        active: true,
        styles: {
          marginTop: 4,
          marginLeft: 4,
          marginBottom: -4,
          marginRight: -4,
          boxShadow: 'none',
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'highlight',
        styles: {
          backgroundColor: theme.color.interactive.highlight.surface.strong.default,
          borderColor: theme.color.interactive.highlight.border.strong,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.highlight.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.highlight.surface.strong.active,
            },
          },
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'highlight',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.highlight.surface.strong.active,
        },
      },
      // Solid
      // Solid Yellow
      {
        variant: 'solid',
        colorScheme: 'highlight',
        styles: {
          backgroundColor: theme.color.interactive.highlight.surface.strong.default,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.highlight.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.highlight.surface.strong.active,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'highlight',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.highlight.surface.strong.active,
        },
      },
      // Solid Green
      {
        variant: 'solid',
        colorScheme: 'affirmative',
        styles: {
          backgroundColor: theme.color.interactive.affirmative.surface.strong.default,
          borderColor: theme.color.interactive.affirmative.border.strong,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.affirmative.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.affirmative.surface.strong.active,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'affirmative',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.affirmative.surface.strong.active,
        },
      },
      // Solid Red
      {
        variant: 'solid',
        colorScheme: 'destructive',
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.strong.default,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.destructive.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.destructive.surface.strong.active,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'destructive',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.strong.active,
        },
      },
      // Outline
      // Outline Grey
      {
        variant: 'outline',
        colorScheme: 'functional',
        styles: {
          borderColor: theme.color.interactive.functional.border.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'functional',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.functional.surface.subtle.active,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'functional',
        inverted: true,
        styles: {
          borderColor: theme.color.interactive.functional.border.inverted,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.active,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'functional',
        inverted: true,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.active,
        },
      },
      // Outline Green
      {
        variant: 'outline',
        colorScheme: 'affirmative',
        styles: {
          borderColor: theme.color.interactive.affirmative.border.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.affirmative.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.affirmative.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'affirmative',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.affirmative.surface.subtle.active,
        },
      },
      // Outline Red
      {
        variant: 'outline',
        colorScheme: 'destructive',
        styles: {
          borderColor: theme.color.interactive.destructive.border.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'destructive',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
        },
      },
      // Ghost
      // Ghost Grey
      {
        variant: 'ghost',
        colorScheme: 'functional',
        styles: {
          textDecorationColor: theme.color.interactive.functional.foreground.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'functional',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.functional.surface.subtle.active,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'functional',
        inverted: true,
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.active,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'functional',
        inverted: true,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.functional.surface.subtle.inverted.active,
        },
      },
      // Ghost Green
      {
        variant: 'ghost',
        colorScheme: 'affirmative',
        styles: {
          textDecorationColor: theme.color.interactive.affirmative.foreground.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.affirmative.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.affirmative.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'affirmative',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.affirmative.surface.subtle.active,
        },
      },
      // Ghost Red
      {
        variant: 'ghost',
        colorScheme: 'destructive',
        styles: {
          textDecorationColor: theme.color.interactive.destructive.foreground.subtle,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'destructive',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
        },
      },
    ],
  },
}));

export default ButtonRoot;
