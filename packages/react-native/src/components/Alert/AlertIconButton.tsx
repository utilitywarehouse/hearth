import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentType } from 'react';
import { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButton, UnstyledIconButtonProps } from '../UnstyledIconButton';
import { useAlertContext } from './Alert.context';

const AlertIconButton = ({
  style,
  icon = ChevronRightSmallIcon,
  ...props
}: Omit<UnstyledIconButtonProps, 'icon'> & { icon?: ComponentType }) => {
  const { colorScheme } = useAlertContext();
  styles.useVariants({ colorScheme });
  return (
    <UnstyledIconButton
      {...props}
      size="sm"
      style={style as ViewStyle}
      icon={icon}
      iconStyle={styles.icon as ViewStyle}
    />
  );
};

const styles = StyleSheet.create(theme => ({
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

AlertIconButton.displayName = 'AlertIconButton';

export default AlertIconButton;
