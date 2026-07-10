import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useHelperContext } from './HelperContext';

const HelperIcon = (props: IconProps) => {
  const { validationStatus } = useHelperContext();
  styles.useVariants({ validationStatus });

  return (
    <Icon
      style={
        Platform.OS === 'web'
          ? // @ts-expect-error - style prop type issue
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : ([styles.icon as StyleProp<ViewStyle>, props.style] as any)
      }
      {...props}
    />
  );
};

HelperIcon.displayName = 'HelperIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    width: theme.components.icon.sm.width,
    height: theme.components.icon.sm.height,
    variants: {
      validationStatus: {
        valid: {
          color: theme.color.feedback.positive.foreground.subtle,
        },
        invalid: {
          color: theme.color.feedback.danger.foreground.subtle,
        },
        initial: {},
      },
    },
  },
}));

export default HelperIcon;
