import { useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Linking, Platform, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { LinkContext } from './Link.context';
import LinkProps from './Link.props';

const LinkRoot = ({
  children,
  inverted = false,
  disabled = false,
  href,
  target,
  rel,
  onPress,
  ...props
}: LinkProps) => {
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

  // `href`/`hrefAttrs`/`tabIndex` aren't typed on `PressableProps`, hence the
  // spread rather than named JSX attributes. Web-only: on native, `<a>`-only
  // attributes have no effect and navigation is handled by `handlePress`
  // calling `Linking.openURL` directly instead.
  const webOnlyProps =
    Platform.OS === 'web'
      ? {
          tabIndex: disabled ? -1 : 0,
          ...(disabled ? { 'aria-disabled': true } : {}),
          ...(!disabled && href ? { href } : {}),
          ...(target || rel ? { hrefAttrs: { target, rel } } : {}),
        }
      : {};

  return (
    <LinkContext.Provider value={value}>
      <Pressable
        {...props}
        {...webOnlyProps}
        disabled={disabled}
        role="link"
        accessible
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={state => [
          styles.container,
          (typeof props.style === 'function' ? props.style(state) : props.style) as ViewStyle,
        ]}
      >
        {children}
      </Pressable>
    </LinkContext.Provider>
  );
};

LinkRoot.displayName = 'LinkRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.components.link.gap,
    _web: {
      '_focus-visible': {
        borderRadius: theme.borderRadius.xs,
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: 1,
        boxShadow: 'none',
      },
    },
    variants: {
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
    },
  },
}));

export default LinkRoot;
