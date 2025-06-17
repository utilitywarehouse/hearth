import { useEffect, useMemo } from 'react';
import AlertTitle from './AlertTitle';
import AlertLink from './AlertLink';
import AlertIconButton from './AlertIconButton';
import AlertCloseButton from './AlertCloseButton';
import type { AlertProps } from './Alert.props';
import { AlertContext } from './Alert.context';
import { StyleSheet } from 'react-native-unistyles';
import { Pressable, ViewProps } from 'react-native';
import AlertText from './AlertText';
import AlertIcon from './AlertIcon';
import AlertContent from './AlertContent';

const Alert = ({
  text,
  title,
  link,
  onPressLink,
  colorScheme = 'blue',
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
        blue: {
          borderColor: theme.components.alert.blue.borderColor,
          backgroundColor: theme.components.alert.blue.backgroundColor,
        },
        green: {
          borderColor: theme.components.alert.green.borderColor,
          backgroundColor: theme.components.alert.green.backgroundColor,
        },
        orange: {
          borderColor: theme.components.alert.orange.borderColor,
          backgroundColor: theme.components.alert.orange.backgroundColor,
        },
        red: {
          borderColor: theme.components.alert.red.borderColor,
          backgroundColor: theme.components.alert.red.backgroundColor,
        },
      },
    },
  },
}));

export default Alert;
