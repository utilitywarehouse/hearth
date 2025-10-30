import { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useLinkContext } from './Link.context';

const LinkText = ({ children, ...props }: TextProps) => {
  const { inverted, disabled, active } = useLinkContext();
  styles.useVariants({ active, inverted, disabled });
  return (
    <BodyText size="md" weight="semibold" {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
  );
};

LinkText.displayName = 'LinkText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.link.color,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: theme.components.link.color,
    _web: {
      _hover: {
        textDecorationLine: 'none',
      },
    },
    variants: {
      active: {
        true: {
          color: theme.components.link.colorActive,
        },
      },
      inverted: {
        true: {
          color: theme.components.link.inverted.color,
          textDecorationColor: theme.components.link.inverted.color,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    compoundVariants: [
      {
        inverted: true,
        active: true,
        styles: {
          color: theme.components.link.inverted.colorActive,
        },
      },
    ],
  },
}));

export default LinkText;
