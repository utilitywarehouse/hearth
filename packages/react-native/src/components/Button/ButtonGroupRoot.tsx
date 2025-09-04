import { type StyleProp, type ViewProps, type ViewStyle, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SpacingValues } from '../../types';

const ButtonGroupRoot = ({
  children,
  attached = false,
  flexDirection = 'row',
  reversed = false,
  space = 'md',
  ...props
}: ViewProps & {
  flexDirection?: ViewStyle['flexDirection'];
  reversed?: boolean;
  attached?: boolean;
  space?: SpacingValues;
}) => {
  let direction = flexDirection;
  if (reversed) {
    if (flexDirection === 'row') direction = 'row-reverse';
    if (flexDirection === 'column') direction = 'column-reverse';
    if (flexDirection === 'row-reverse') direction = 'row';
    if (flexDirection === 'column-reverse') direction = 'column';
  }
  styles.useVariants({
    attached,
    space,
  });
  return (
    <View
      {...props}
      style={[styles.text, styles.extraStyles(direction) as StyleProp<ViewStyle>, props.style]}
    >
      {children}
    </View>
  );
};

ButtonGroupRoot.displayName = 'ButtonGroupRoot';

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      space: {
        none: {
          gap: theme.layout.mobile.spacing.none,
        },
        '2xs': {
          gap: theme.layout.mobile.spacing['2xs'],
        },
        xs: {
          gap: theme.layout.mobile.spacing.xs,
        },
        sm: {
          gap: theme.layout.mobile.spacing.sm,
        },
        md: {
          gap: theme.layout.mobile.spacing.md,
        },
        lg: {
          gap: theme.layout.mobile.spacing.lg,
        },
        xl: {
          gap: theme.layout.mobile.spacing.xl,
        },
        '2xl': {
          gap: theme.layout.mobile.spacing['2xl'],
        },
      },
      attached: {
        true: {
          gap: 0,
        },
      },
    },
  },
  extraStyles: (flexDirection: ViewStyle['flexDirection']) => ({ flexDirection }),
}));

export default ButtonGroupRoot;
