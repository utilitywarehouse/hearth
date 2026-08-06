import type { ButtonProps, ButtonWithStringChildrenProps } from './Button.props';
import ButtonTextComponent from './ButtonText';
import ButtonSpinnerComponent from './ButtonSpinner';
import ButtonIconComponent from './ButtonIcon';

import ButtonRoot from './ButtonRoot';
import { useButtonGroupContext } from './ButtonGroup.context';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';

export const ButtonText = ButtonTextComponent;
export const ButtonSpinner = ButtonSpinnerComponent;
export const ButtonIcon = ButtonIconComponent;

ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';

const Button = ({ children, disabled = false, pressed, text, ...props }: ButtonProps) => {
  const { disabled: groupDisabled, loading: groupLoading } = useButtonGroupContext();
  const { loading } = props;
  const isLoading = loading ?? groupLoading;
  const buttonDisabled = isLoading || (disabled ?? groupDisabled);
  styles.useVariants({ loading: isLoading });
  if (typeof children === 'string' || typeof children === 'number' || !children) {
    const { icon, iconPosition = 'left' } = props as ButtonWithStringChildrenProps;
    return (
      <ButtonRoot {...props} disabled={buttonDisabled} pressed={pressed}>
        {!!icon && !isLoading && iconPosition === 'left' ? <ButtonIcon as={icon} /> : null}
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ButtonSpinner />
          </View>
        ) : null}
        <ButtonText style={styles.textLoading}>{children ?? text}</ButtonText>
        {!!icon && !isLoading && iconPosition === 'right' ? <ButtonIcon as={icon} /> : null}
      </ButtonRoot>
    );
  }
  return (
    <ButtonRoot {...props} disabled={buttonDisabled}>
      {children}
    </ButtonRoot>
  );
};

const styles = StyleSheet.create(theme => ({
  loadingWrapper: {
    flexDirection: 'row',
    gap: theme.components.button.gap,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    variants: {
      loading: {
        true: {
          opacity: 0,
        },
      },
    },
  },
}));

Button.displayName = 'Button';

export default Button;
