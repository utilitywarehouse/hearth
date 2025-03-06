import React, { ComponentType, useState } from 'react';
import { createInput } from '@gluestack-ui/input';
import type InputProps from './Input.props';

import InputRoot from './InputRoot';
import InputSlotComponent from './InputSlot';
import InputIconComponent from './InputIcon';
import InputFieldComponent from './InputField';
import { useFormFieldContext } from '../FormField';
import {
  CloseMediumIcon,
  EyeMediumIcon,
  EyeOffMediumIcon,
  SearchMediumIcon,
} from '../../../docs/components/icons';
import { InputWithoutChildrenProps } from './Input.props';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { Spinner } from '../Spinner';
import { useTheme } from '../../hooks';

export const InputComponent = createInput({
  Icon: InputIconComponent,
  Slot: InputSlotComponent,
  Root: InputRoot,
  Input: InputFieldComponent,
});

export const InputSlot = InputComponent.Slot;
export const InputField = InputComponent.Input;
export const InputIcon = InputComponent.Icon;

const Input: React.FC<InputProps> = ({
  validationStatus = 'initial',
  children,
  disabled,
  focused,
  readonly,
  leadingIcon,
  trailingIcon,
  type,
  showPasswordToggle = true,
  onClear,
  format,
  loading,
  clearable = false,
  ...props
}) => {
  const formFieldContext = useFormFieldContext();
  const { disabled: formFieldDisabled } = formFieldContext;
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
  const [fieldType, setFieldType] = useState<'password' | 'text'>(
    type === 'password' ? 'password' : 'text'
  );
  const { components } = useTheme();

  const shouldShowPasswordToggle = type === 'password' && showPasswordToggle;
  const shouldShowClear = clearable && !!(props as InputWithoutChildrenProps)?.value;

  const toggleFieldType = () => {
    setFieldType(fieldType === 'password' ? 'text' : 'password');
  };

  const leadingIconComponent = ((): ComponentType | undefined => {
    if (type === 'search') {
      return SearchMediumIcon;
    }
    return leadingIcon;
  })();

  return (
    <InputComponent
      {...(children ? props : {})}
      validationStatus={validationStatusFromContext}
      isInvalid={validationStatusFromContext === 'invalid'}
      isReadOnly={readonly}
      isDisabled={formFieldDisabled ?? disabled}
      isFocused={focused}
    >
      {children ? (
        <>{children}</>
      ) : (
        <>
          {!!leadingIconComponent && (
            <InputSlot>
              <InputIcon as={leadingIconComponent} />
            </InputSlot>
          )}
          <InputField type={fieldType} {...props} />
          {shouldShowClear && (
            <InputSlot>
              <UnstyledIconButton onPress={onClear} icon={CloseMediumIcon} />
            </InputSlot>
          )}
          {loading && (
            <InputSlot>
              <Spinner size="xs" color={components.icon.color} />
            </InputSlot>
          )}
          {shouldShowPasswordToggle && (
            <InputSlot>
              <UnstyledIconButton
                onPress={toggleFieldType}
                icon={fieldType === 'password' ? EyeMediumIcon : EyeOffMediumIcon}
              />
            </InputSlot>
          )}
          {trailingIcon && (
            <InputSlot>
              <InputIcon as={trailingIcon} />
            </InputSlot>
          )}
        </>
      )}
    </InputComponent>
  );
};

export default Input;
