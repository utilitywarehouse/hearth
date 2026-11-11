import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useCheckboxContext } from './Checkbox.context';

/** The tick inside a `CheckboxIndicator`. It only renders while its parent `Checkbox` is checked. */
const CheckboxIcon = ({ style, ...props }: IconProps) => {
  const { checked } = useCheckboxContext();
  if (!checked) return null;
  return (
    <Icon
      as={TickSmallIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? {
              ...(styles.icon as StyleProp<ViewStyle>),
              ...(style as StyleProp<ViewStyle>),
            }
          : ([styles.icon as ViewStyle, style] as any)
      }
    />
  );
};

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.checkbox.checked.icon.color,
  },
}));

CheckboxIcon.displayName = 'CheckboxIcon';

export default CheckboxIcon;
