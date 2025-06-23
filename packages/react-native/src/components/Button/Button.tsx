import type { ButtonProps, ButtonWithStringChildrenProps } from './Button.props';
import ButtonTextComponent from './ButtonText';
import ButtonSpinnerComponent from './ButtonSpinner';
import ButtonIconComponent from './ButtonIcon';
import { createButton } from '@gluestack-ui/button';

import ButtonRoot from './ButtonRoot';
import ButtonGroupRoot from './ButtonGroupRoot';
import { useButtonGroupContext } from './ButtonGroup.context';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';

const ButtonComponent = createButton({
  Root: ButtonRoot,
  Group: ButtonGroupRoot,
  Icon: ButtonIconComponent,
  Spinner: ButtonSpinnerComponent,
  Text: ButtonTextComponent,
});

export const ButtonText = ButtonComponent.Text;
export const ButtonSpinner = ButtonComponent.Spinner;
export const ButtonIcon = ButtonComponent.Icon;
export const ButtonGroupComponent = ButtonComponent.Group;

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
      <ButtonComponent {...props} isDisabled={buttonDisabled} isPressed={pressed}>
        {!!icon && !isLoading && iconPosition === 'left' ? <ButtonIcon as={icon} /> : null}
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ButtonSpinner />
          </View>
        ) : null}
        <ButtonText style={styles.textLoading}>{children ?? text}</ButtonText>
        {!!icon && !isLoading && iconPosition === 'right' ? <ButtonIcon as={icon} /> : null}
      </ButtonComponent>
    );
  }
  return (
    <ButtonComponent {...props} isDisabled={buttonDisabled}>
      {children}
    </ButtonComponent>
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
