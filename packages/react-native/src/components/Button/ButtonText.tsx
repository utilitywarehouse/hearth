import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import { useButtonContext } from './Button.context';

const ButtonText = ({ children, ...props }: TextProps) => {
  const { colorScheme, variant, inverted, disabled } = useButtonContext();
  styles.useVariants({ colorScheme, variant, inverted, disabled });
  return (
    <DetailText size="md" {...props} style={[styles.text, props.style]}>
      {children}
    </DetailText>
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
        yellow: {},
        red: {},
        green: {},
        grey: {},
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
        colorScheme: 'yellow',
        styles: {
          color: theme.components.button.emphasis.yellow.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'yellow',
        styles: {
          color: theme.components.button.solid.yellow.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.solid.red.foregroundColor,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.solid.green.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.outline.red.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.outline.green.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'red',
        styles: {
          color: theme.components.button.ghost.red.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'green',
        styles: {
          color: theme.components.button.ghost.green.foregroundColor,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          color: theme.components.button.outline.grey.inverted.foregroundColor,
        },
      },
      {
        variant: 'ghost',
        colorScheme: 'grey',
        inverted: true,
        styles: {
          color: theme.components.button.outline.grey.inverted.foregroundColor,
        },
      },
    ],
  },
}));

export default ButtonText;
