import { useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Linking, Platform, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { InlineLinkContext } from './InlineLink.context';
import InlineLinkProps from './InlineLink.props';

const InlineLinkRoot = ({
  children,
  inverted = false,
  disabled = false,
  href,
  target,
  rel,
  onPress,
  ...props
}: InlineLinkProps) => {
  const [active, setActive] = useState(false);
  styles.useVariants({ disabled, inverted, active });
  const value = useMemo(() => ({ inverted, disabled, active }), [inverted, disabled, active]);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) return;
      // RN has no built-in navigation for `href` - the web `<a>` tag handles
      // it natively, but native needs it triggered explicitly.
      if (Platform.OS !== 'web' && href) {
        Linking.openURL(href).catch(err => console.error('An error occurred', err));
      }
      onPress?.(event);
    },
    [disabled, href, onPress]
  );
  const handlePressIn = useCallback(() => {
    if (!disabled) setActive(true);
  }, [disabled]);
  const handlePressOut = useCallback(() => {
    if (!disabled) setActive(false);
  }, [disabled]);

  // `href`/`hrefAttrs`/`tabIndex` aren't typed on `TextProps`, hence the
  // spread rather than named JSX attributes. Web-only: on native, `<a>`-only
  // attributes have no effect and navigation is handled by `handlePress`
  // calling `Linking.openURL` directly instead.
  const webOnlyProps =
    Platform.OS === 'web'
      ? {
          'aria-disabled': disabled,
          tabIndex: disabled ? -1 : 0,
          ...(!disabled && href ? { href } : {}),
          ...(target || rel ? { hrefAttrs: { target, rel } } : {}),
        }
      : {};

  return (
    <InlineLinkContext.Provider value={value}>
      <Text
        {...props}
        {...webOnlyProps}
        role="link"
        accessible
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, props.style]}
      >
        {children}
      </Text>
    </InlineLinkContext.Provider>
  );
};

InlineLinkRoot.displayName = 'InlineLinkRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    color: theme.components.inlineLink.color,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: theme.components.inlineLink.color,
    _web: {
      '_focus-visible': {
        borderRadius: theme.borderRadius.xs,
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: 1,
        boxShadow: 'none',
      },
      _hover: {
        textDecorationLine: 'none',
      },
    },
    variants: {
      active: {
        true: {
          color: theme.components.inlineLink.color,
        },
      },
      inverted: {
        true: {
          color: theme.components.inlineLink.inverted.color,
          textDecorationColor: theme.components.inlineLink.inverted.color,
          _web: {
            '_focus-visible': {
              outlineColor: theme.color.focus.inverted,
            },
          },
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      inline: {
        true: {
          color: theme.color.blue[700],
          textDecorationColor: theme.color.blue[700],
        },
      },
    },
    compoundVariants: [
      {
        inverted: true,
        active: true,
        styles: {
          color: theme.components.inlineLink.inverted.colorActive,
        },
      },
    ],
  },
}));

export default InlineLinkRoot;
