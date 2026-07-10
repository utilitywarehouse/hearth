import { Platform, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import IconProps from '../Icon/Icon.props';
import { useIconButtonContext } from './IconButton.context';

const IconButtonIcon = (props: IconProps) => {
  const { colorScheme, variant, inverted, disabled, size } = useIconButtonContext();
  styles.useVariants({
    colorScheme,
    variant,
    inverted,
    disabled,
    size,
  });
  return (
    <Icon
      {...props}
      style={
        Platform.OS === 'web'
          ? // @ts-expect-error - style prop type issue
            { ...(styles.icon as StyleProp<ViewStyle>), ...props.style }
          : [styles.icon as ViewStyle, props.style]
      }
    >
      {props.children}
    </Icon>
  );
};

IconButtonIcon.displayName = 'IconButtonIcon';

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
      size: {
        sm: {
          width: theme.components.iconSize.sm,
          height: theme.components.iconSize.sm,
        },
        md: {
          width: theme.components.iconSize.md,
          height: theme.components.iconSize.md,
        },
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

export default IconButtonIcon;
