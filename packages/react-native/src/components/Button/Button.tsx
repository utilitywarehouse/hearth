import { createButton } from '@gluestack-ui/core/button/creator';
import type { IButtonGroupProps } from '@gluestack-ui/core/lib/esm/button/creator/types';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import type { ButtonProps, ButtonWithStringChildrenProps } from './Button.props';
import ButtonIconComponent from './ButtonIcon';
import ButtonSpinnerComponent from './ButtonSpinner';
import ButtonTextComponent from './ButtonText';

import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useButtonGroupContext } from './ButtonGroup.context';
import ButtonGroupRoot from './ButtonGroupRoot';
import ButtonRoot from './ButtonRoot';

const ButtonComponent = createButton({
  Root: ButtonRoot,
  Group: ButtonGroupRoot,
  Icon: ButtonIconComponent,
  Spinner: ButtonSpinnerComponent,
  Text: ButtonTextComponent,
});

type ButtonTextProps = ComponentPropsWithoutRef<typeof ButtonTextComponent>;
type ButtonTextRef = ComponentRef<typeof ButtonTextComponent>;
type ButtonTextComponentType = ForwardRefExoticComponent<
  ButtonTextProps & RefAttributes<ButtonTextRef>
>;
export const ButtonText: ButtonTextComponentType = forwardRef((props: ButtonTextProps, ref) => (
  <ButtonComponent.Text {...props} ref={ref} />
));

type ButtonSpinnerProps = ComponentPropsWithoutRef<typeof ButtonSpinnerComponent>;
type ButtonSpinnerRef = ComponentRef<typeof ButtonSpinnerComponent>;
type ButtonSpinnerComponentType = ForwardRefExoticComponent<
  ButtonSpinnerProps & RefAttributes<ButtonSpinnerRef>
>;
export const ButtonSpinner: ButtonSpinnerComponentType = forwardRef(
  (props: ButtonSpinnerProps, ref) => <ButtonComponent.Spinner {...props} ref={ref} />
);

type ButtonIconProps = ComponentPropsWithoutRef<typeof ButtonIconComponent>;
type ButtonIconRef = ComponentRef<typeof ButtonIconComponent>;
type ButtonIconComponentType = ForwardRefExoticComponent<
  ButtonIconProps & RefAttributes<ButtonIconRef>
>;
export const ButtonIcon: ButtonIconComponentType = forwardRef((props: ButtonIconProps, ref) => (
  <ButtonComponent.Icon {...props} ref={ref} />
));

type ButtonGroupBaseProps = ComponentPropsWithoutRef<typeof ButtonGroupRoot>;
type ButtonGroupProps = Omit<ButtonGroupBaseProps, 'children'> &
  Partial<IButtonGroupProps> & {
    children?: IButtonGroupProps['children'];
  };
type ButtonGroupRef = ComponentRef<typeof ButtonGroupRoot>;
type ButtonGroupComponentType = ForwardRefExoticComponent<
  ButtonGroupProps & RefAttributes<ButtonGroupRef>
>;
export const ButtonGroupComponent: ButtonGroupComponentType = forwardRef(
  ({ children, ...rest }: ButtonGroupProps, ref) => {
    const groupProps = {
      ...rest,
      children: (children ?? null) as IButtonGroupProps['children'],
    } as IButtonGroupProps & Omit<ButtonGroupBaseProps, 'children'>;

    return <ButtonComponent.Group {...groupProps} ref={ref} />;
  }
);

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
