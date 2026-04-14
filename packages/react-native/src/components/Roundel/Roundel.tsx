import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type RoundelProps from './Roundel.props';

const Roundel = ({ variant = 'success', style, ...props }: RoundelProps) => {
  styles.useVariants({ variant });

  const icon =
    variant === 'error' ? CloseSmallIcon : variant === 'success' ? TickSmallIcon : undefined;

  return (
    <View {...props} style={[styles.container, style]}>
      {icon ? <Icon as={icon} size="sm" /> : null}
    </View>
  );
};

Roundel.displayName = 'Roundel';

const styles = StyleSheet.create(theme => ({
  container: {
    width: theme.space[300],
    height: theme.space[300],
    borderRadius: theme.components.parts.roundel.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'solid',
    variants: {
      variant: {
        success: {
          backgroundColor: theme.color.feedback.positive.surface.default,
        },
        error: {
          backgroundColor: theme.color.feedback.danger.surface.default,
        },
        pending: {
          borderWidth: theme.components.parts.roundel.pending.borderWidth,
          borderStyle: 'dashed',
          borderColor: theme.color.border.strong,
        },
      },
    },
  },
}));

export default Roundel;
