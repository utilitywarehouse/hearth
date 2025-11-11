import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { CircleIcon } from '../Icons';

const RadioIcon = ({ style, ...props }: IconProps) => {
  return (
    <Icon
      as={CircleIcon}
      {...props}
      style={
        Platform.OS === 'web'
          ? {
              // @ts-expect-error - style prop type issue
              ...(styles.container as StyleProp<ViewStyle>),
              // @ts-expect-error - style prop type issue
              ...(props.style as StyleProp<ViewStyle>),
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
