import { Icon } from '../Icon';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import IconProps from '../Icon/Icon.props';
import { StyleSheet } from 'react-native-unistyles';
import { Platform, ViewStyle } from 'react-native';

const CheckboxIcon = ({ style, ...props }: IconProps) => {
  return (
    <Icon
      as={TickSmallIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.icon as any, style)
          : ([styles.icon as ViewStyle, style] as any)
      }
    />
  );
};

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.checkbox.checked.iconColor,
  },
}));

CheckboxIcon.displayName = 'CheckboxIcon';

export default CheckboxIcon;
