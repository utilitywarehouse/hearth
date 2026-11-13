import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { CircleIcon } from '../Icons';
import { useRadioContext } from './Radio.context';

/** The dot inside a `RadioIndicator`. It only renders while its parent `Radio` is checked. */
const RadioIcon = ({ style, ...props }: IconProps) => {
  const { checked } = useRadioContext();
  if (!checked) return null;
  return (
    <Icon
      as={CircleIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? {
              ...(styles.container as StyleProp<ViewStyle>),
              ...(style as StyleProp<ViewStyle>),
            }
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
