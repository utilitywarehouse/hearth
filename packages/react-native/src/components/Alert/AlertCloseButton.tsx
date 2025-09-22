import { CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButton, UnstyledIconButtonProps } from '../UnstyledIconButton';
import { useAlertContext } from './Alert.context';

const AlertCloseButton = ({
  style,
  icon = CloseSmallIcon,
  ...props
}: Omit<UnstyledIconButtonProps, 'icon'> & { icon?: ComponentType }) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <UnstyledIconButton
      {...props}
      size="sm"
      style={[styles.button, style as ViewStyle]}
      icon={icon}
      iconStyle={styles.icon as ViewStyle}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  button: {
    alignSelf: 'flex-start',
    minWidth: 20,
    minHeight: 20,
  },
  icon: {
    variants: {
      colorScheme: {
        info: {
          color: theme.color.feedback.info.foreground.default,
        },
        positive: {
          color: theme.color.feedback.positive.foreground.default,
        },
        danger: {
          color: theme.color.feedback.danger.foreground.default,
        },
        warning: {
          color: theme.color.feedback.warning.foreground.default,
        },
      },
    },
  },
}));

AlertCloseButton.displayName = 'AlertCloseButton';

export default AlertCloseButton;
