import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { CircleIcon } from '../Icons';
import IconProps from '../Icon/Icon.props';
import { Platform } from 'react-native';

const RadioIcon = ({ style, ...props }: IconProps) => {
  return (
    <Icon
      as={CircleIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.container, style)
          : ([styles.container, style] as any)
      }
    />
  );
};

RadioIcon.displayName = 'RadioIcon';

const styles = StyleSheet.create(theme => ({
  container: {
    width: 14,
    height: 14,
    borderRadius: theme.components.radio.borderRadius,
    color: theme.components.radio.checked.color,
  },
}));

export default RadioIcon;
