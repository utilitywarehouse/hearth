import { useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { getFlattenedColorValue } from '../../utils';
import { IconButtonContext } from './IconButton.context';
import type { IconButtonProps } from './IconButton.props';

const IconButtonRoot = ({
  children,
  colorScheme = 'highlight',
  variant = 'solid',
  size = 'md',
  inverted = false,
  states,
  backgroundColor,
  activeBackgroundColor,
  shadowColor,
  ...props
}: IconButtonProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active, disabled } = states || {};
  styles.useVariants({ colorScheme, variant, size, inverted, disabled, active });
  const value = useMemo(
    () => ({ colorScheme, variant, size, inverted, disabled, active }),
    [colorScheme, variant, size, inverted, disabled, active]
  );
  return (
    <IconButtonContext.Provider value={value}>
      <Pressable
        {...props}
        style={[
          styles.container,
          styles.overrides({
            backgroundColor,
            activeBackgroundColor,
            shadowColor,
            active,
            variant,
          }),
          props.style as ViewStyle,
        ]}
      >
        {children}
      </Pressable>
    </IconButtonContext.Provider>
  );
};

IconButtonRoot.displayName = 'IconButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.components.button.borderWidth,
    borderRadius: theme.components.button.borderRadius,
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
        },
      },
      size: {
        sm: {
          paddingVertical:
            theme.components.iconButton.sm.paddingVertical -
            theme.components.button.borderWidth * 2,
          paddingHorizontal:
            theme.components.iconButton.sm.paddingHorizontal - theme.components.button.borderWidth,

          minHeight: 32,
          maxHeight: 32,
          minWidth: 32,
          maxWidth: 32,
        },
        md: {
          paddingVertical:
            theme.components.iconButton.md.paddingVertical -
            theme.components.button.borderWidth * 2,
          paddingHorizontal:
            theme.components.iconButton.md.paddingHorizontal - theme.components.button.borderWidth,

          minHeight: 48,
          maxHeight: 48,
          minWidth: 48,
          maxWidth: 48,
        },
      },
    },
    compoundVariants: [
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
  overrides: ({ backgroundColor, activeBackgroundColor, shadowColor, active, variant }) => ({
    ...(backgroundColor
      ? {
          backgroundColor: getFlattenedColorValue(backgroundColor, theme.color),
          _web: {
            _hover: {
              backgroundColor: getFlattenedColorValue(
                activeBackgroundColor ?? backgroundColor,
                theme.color
              ),
            },
            _active: {
              backgroundColor: getFlattenedColorValue(
                activeBackgroundColor ?? backgroundColor,
                theme.color
              ),
            },
          },
        }
      : {}),
    ...(active && activeBackgroundColor
      ? {
          backgroundColor: getFlattenedColorValue(activeBackgroundColor, theme.color),
        }
      : {}),
    ...(shadowColor && variant === 'emphasis'
      ? {
          boxShadow: `${theme.shadow.mobile.sm.x}px ${theme.shadow.mobile.sm.y}px ${theme.shadow.mobile.sm.spread}px ${getFlattenedColorValue(shadowColor, theme.color)}`,
        }
      : {}),
    ...(active && shadowColor && variant === 'emphasis'
      ? {
          boxShadow: 'none',
        }
      : {}),
  }),
}));

export default IconButtonRoot;
