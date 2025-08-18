import { useEffect, useMemo } from 'react';
import { Pressable, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { AlertContext } from './Alert.context';
import type { AlertProps } from './Alert.props';
import AlertCloseButton from './AlertCloseButton';
import AlertContent from './AlertContent';
import AlertIcon from './AlertIcon';
import AlertIconButton from './AlertIconButton';
import AlertLink from './AlertLink';
import AlertText from './AlertText';
import AlertTitle from './AlertTitle';

const Alert = ({
  text,
  title,
  link,
  onPressLink,
  colorScheme = 'info',
  onPressIconButton,
  onClose,
  children,
  onPress,
  iconButtonTestID,
  linkTestID,
  style,
  ...props
}: AlertProps) => {
  useEffect(() => {
    if (__DEV__) {
      if (onPressIconButton && link) {
        console.warn(
          'You cannot use both onPressIconButton and link props at the same time. Please choose one or the other.'
        );
      }
    }
  }, [onPressIconButton, link]);

  const value = useMemo(() => ({ colorScheme }), [colorScheme]);

  styles.useVariants({ colorScheme });

  return (
    <AlertContext.Provider value={value}>
      <Pressable
        {...props}
        style={[styles.container, style as ViewProps['style']]}
        onPress={onPress}
        disabled={!onPress}
      >
        {children ? (
          children
        ) : (
          <>
            <AlertIcon />
            <AlertContent>
              {!!title && <AlertTitle>{title}</AlertTitle>}
              <AlertText>{text}</AlertText>
              {!!link && (
                <AlertLink onPress={onPressLink} testID={linkTestID}>
                  {link}
                </AlertLink>
              )}
            </AlertContent>
            {(!!onPressIconButton || !!onPress) && !link && (
              <AlertIconButton onPress={onPressIconButton || onPress} testID={iconButtonTestID} />
            )}
            {!!onClose && <AlertCloseButton onPress={onClose} />}
          </>
        )}
      </Pressable>
    </AlertContext.Provider>
  );
};

Alert.displayName = 'Alert';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    padding: theme.components.alert.padding,
    flexDirection: 'row',
    borderRadius: theme.components.alert.borderRadius,
    gap: theme.components.alert.gap,
    borderWidth: theme.components.alert.borderWidth,
    variants: {
      colorScheme: {
        info: {
          borderColor: theme.color.feedback.info.border,
          backgroundColor: theme.color.feedback.info.surface.subtle,
        },
        positive: {
          borderColor: theme.color.feedback.positive.border,
          backgroundColor: theme.color.feedback.positive.surface.subtle,
        },
        warning: {
          borderColor: theme.color.feedback.warning.border,
          backgroundColor: theme.color.feedback.warning.surface.subtle,
        },
        danger: {
          borderColor: theme.color.feedback.danger.border,
          backgroundColor: theme.color.feedback.danger.surface.subtle,
        },
      },
    },
  },
}));

export default Alert;
