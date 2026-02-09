import { type StyleProp, type ViewProps, type ViewStyle, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { SpacingValues } from '../../types';

const ButtonGroupRoot = ({
  children,
  attached = false,
  flexDirection = 'row',
  reversed = false,
  spacing = 'md',
  space,
  ...props
}: ViewProps & {
  flexDirection?: ViewStyle['flexDirection'];
  reversed?: boolean;
  attached?: boolean;
  /**
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release
   */
  space?: SpacingValues;
  spacing?: SpacingValues;
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
    spacing: space ?? spacing,
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
      spacing: {
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
