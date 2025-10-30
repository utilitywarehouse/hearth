import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useButtonContext } from './Button.context';

const ButtonText = ({ children, ...props }: TextProps) => {
  const { colorScheme, variant, inverted, disabled } = useButtonContext();
  styles.useVariants({ colorScheme, variant, inverted, disabled });
  return (
    <BodyText size="md" weight="semibold" {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
  );
};

ButtonText.displayName = 'ButtonText';

const styles = StyleSheet.create(theme => ({
  text: {
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

export default ButtonText;
