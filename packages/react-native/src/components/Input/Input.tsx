import React from 'react';
import { createInput } from '@gluestack-ui/input';
import type InputProps from './Input.props';

import InputRoot from './InputRoot';
import InputSlotComponent from './InputSlot';
import InputIconComponent from './InputIcon';
import InputFieldComponent from './InputField';
import { useFormFieldContext } from '../FormField';

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
  ...props
}) => {
  const formFieldContext = useFormFieldContext();
  const { disabled: formFieldDisabled } = formFieldContext;
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;

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
          {leadingIcon && (
            <InputSlot>
              <InputIcon as={leadingIcon} />
            </InputSlot>
          )}
          <InputField type={type} {...props} />
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
