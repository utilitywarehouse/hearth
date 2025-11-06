import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useButtonContext } from './Button.context';

const ButtonIcon = ({ children, ...props }: IconProps) => {
  const { colorScheme, variant, inverted, disabled } = useButtonContext();
  styles.useVariants({ colorScheme, variant, inverted, disabled });

  return (
    <Icon
      {...props}
      style={
        Platform.OS === 'web'
          ? // @ts-expect-error - style prop type issue
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : [styles.icon as StyleProp<ViewStyle>, props.style]
      }
    >
      {children}
    </Icon>
  );
};

ButtonIcon.displayName = 'ButtonIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    variants: {
      variant: {
        emphasis: {},
        solid: {},
        outline: {},
        ghost: {},
      },
      colorScheme: {
        highlight: {},
        destructive: {},
        affirmative: {},
        functional: {},
      },
      inverted: {
        true: {},
      },
      disabled: {
        true: {},
      },
    },
    compoundVariants: [
      {
        variant: 'emphasis',
        colorScheme: 'highlight',
        styles: {
          color: theme.color.interactive.highlight.foreground.strong,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'highlight',
        styles: {
          color: theme.color.interactive.highlight.foreground.strong,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'destructive',
        styles: {
          color: theme.color.interactive.destructive.foreground.strong,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'affirmative',
        styles: {
          color: theme.color.interactive.affirmative.foreground.strong,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'destructive',
        styles: {
          color: theme.color.interactive.destructive.foreground.subtle,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'affirmative',
        styles: {
          color: theme.color.interactive.affirmative.foreground.subtle,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'functional',
        styles: {
          color: theme.color.interactive.functional.foreground.subtle,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'functional',
        inverted: true,
        styles: {
          color: theme.color.interactive.functional.foreground.strong,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'destructive',
        styles: {
          color: theme.color.interactive.destructive.foreground.subtle,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'affirmative',
        styles: {
          color: theme.color.interactive.affirmative.foreground.subtle,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'functional',
        styles: {
          color: theme.color.interactive.functional.foreground.subtle,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'functional',
        inverted: true,
        styles: {
          color: theme.color.interactive.functional.foreground.strong,
        },
      },
    ],
  },
}));

export default ButtonIcon;
