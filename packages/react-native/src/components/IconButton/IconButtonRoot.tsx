/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import type { IconButtonProps } from './IconButton.props';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { IconButtonContext } from './IconButton.context';
import { PressableRef } from '../../types';

const IconButtonRoot = forwardRef<
  PressableRef,
  PropsWithChildren<IconButtonProps & { states?: { active?: boolean; disabled?: boolean } }>
>(
  (
    {
      children,
      colorScheme = 'yellow',
      variant = 'solid',
      size = 'md',
      inverted = false,
      states,
      ...props
    },
    ref
  ) => {
    const { active, disabled } = states || {};
    styles.useVariants({ colorScheme, variant, size, inverted, disabled, active });
    const value = useMemo(
      () => ({ colorScheme, variant, size, inverted, disabled, active }),
      [colorScheme, variant, size, inverted, disabled, active]
    );
    return (
      <IconButtonContext.Provider value={value}>
        <Pressable ref={ref} {...props} style={[styles.container, props.style as ViewStyle]}>
          {children}
        </Pressable>
      </IconButtonContext.Provider>
    );
  }
);

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
        outlineColor: theme.components.focus.border,
        outlineOffset: 1,
        boxShadow: 'none',
      },
    },
    variants: {
      colorScheme: {
        yellow: {},
        green: {},
        red: {},
        grey: {},
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
              outlineColor: theme.components.focus.borderInverted,
            },
          },
        },
      },
      active: {
        true: {},
      },
      variant: {
        emphasis: {
          borderColor: theme.components.button.emphasis.borderColor,
          boxShadow: `${theme.shadow.mobile.sm.x}px ${theme.shadow.mobile.sm.y}px ${theme.shadow.mobile.sm.spread}px ${theme.components.button.emphasis.shadowColor}`,
        },
        solid: {
          borderColor: theme.components.button.solid.borderColor,
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
        colorScheme: 'yellow',
        styles: {
          backgroundColor: theme.components.button.emphasis.yellow.backgroundColor,
          borderColor: theme.components.button.emphasis.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.emphasis.yellow.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.emphasis.yellow.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'emphasis',
        colorScheme: 'yellow',
        active: true,
        styles: {
          backgroundColor: theme.components.button.emphasis.yellow.backgroundColorActive,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'yellow',
        styles: {
          backgroundColor: theme.components.button.solid.yellow.backgroundColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.solid.yellow.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.solid.yellow.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'yellow',
        active: true,
        styles: {
          backgroundColor: theme.components.button.solid.yellow.backgroundColorActive,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'green',
        styles: {
          backgroundColor: theme.components.button.solid.green.backgroundColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.solid.green.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.solid.green.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'green',
        active: true,
        styles: {
          backgroundColor: theme.components.button.solid.green.backgroundColorActive,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        styles: {
          backgroundColor: theme.components.button.solid.red.backgroundColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.solid.red.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.solid.red.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        active: true,
        styles: {
          backgroundColor: theme.components.button.solid.red.backgroundColorActive,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        styles: {
          borderColor: theme.components.button.outline.grey.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.outline.grey.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.outline.grey.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        active: true,
        styles: {
          backgroundColor: theme.components.button.outline.grey.backgroundColorActive,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          borderColor: theme.components.button.outline.grey.inverted.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.outline.grey.inverted.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.outline.grey.inverted.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        inverted: true,
        active: true,
        styles: {
          backgroundColor: theme.components.button.outline.grey.inverted.backgroundColorActive,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        inverted: true,
        active: true,
        styles: {
          backgroundColor: theme.components.button.outline.grey.inverted.backgroundColorActive,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'green',
        styles: {
          borderColor: theme.components.button.outline.green.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.outline.green.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.outline.green.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'green',
        active: true,
        styles: {
          backgroundColor: theme.components.button.outline.green.backgroundColorActive,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        styles: {
          borderColor: theme.components.button.outline.red.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.button.outline.red.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.outline.red.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        active: true,
        styles: {
          backgroundColor: theme.components.button.outline.red.backgroundColorActive,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.button.ghost.grey.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.ghost.grey.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        active: true,
        styles: {
          backgroundColor: theme.components.button.ghost.grey.backgroundColorActive,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.button.ghost.grey.inverted.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.ghost.grey.inverted.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        inverted: true,
        active: true,
        styles: {
          backgroundColor: theme.components.button.ghost.grey.inverted.backgroundColorActive,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'green',
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.button.ghost.green.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.ghost.green.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'green',
        active: true,
        styles: {
          backgroundColor: theme.components.button.ghost.green.backgroundColorActive,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'red',
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.components.button.ghost.red.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.button.ghost.red.backgroundColorActive,
            },
          },
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'red',
        active: true,
        styles: {
          backgroundColor: theme.components.button.ghost.red.backgroundColorActive,
        },
      },
    ],
  },
}));

export default IconButtonRoot;
