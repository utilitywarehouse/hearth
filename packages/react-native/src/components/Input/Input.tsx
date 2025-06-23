import { ComponentType, useState } from 'react';
import { createInput } from '@gluestack-ui/input';
import type InputProps from './Input.props';

import InputRoot from './InputRoot';
import InputSlotComponent from './InputSlot';
import InputIconComponent from './InputIcon';
import InputFieldComponent from './InputField';
import { useFormFieldContext } from '../FormField';
import {
  CalendarMediumIcon,
  CloseSmallIcon,
  EyeSmallIcon,
  EyeOffSmallIcon,
  SearchMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { InputWithoutChildrenProps } from './Input.props';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { Spinner } from '../Spinner';
import { useTheme } from '../../hooks';
import { DetailText } from '../DetailText';
import { Platform } from 'react-native';

export const InputComponent = createInput({
  Icon: InputIconComponent,
  Slot: InputSlotComponent,
  Root: InputRoot,
  Input: InputFieldComponent,
});

export const InputSlot = InputComponent.Slot;
export const InputField = InputComponent.Input;
export const InputIcon = InputComponent.Icon;

const Input = ({
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
  required,
  ...props
}: InputProps) => {
  const formFieldContext = useFormFieldContext();
  const { disabled: formFieldDisabled } = formFieldContext;
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
  const isRequired = formFieldContext?.required ?? required;
  const [fieldType, setFieldType] = useState<'password' | 'text'>(
    type === 'password' ? 'password' : 'text'
  );
  const { components } = useTheme();

  const defaultFornat = (() => {
    if (type === 'currency') {
      return '0.00';
    }
    if (type === 'date') {
      return 'DD/MM/YYYY';
    }
    return;
  })();

  const getPlaceholder = (() => {
    if (type === 'currency') {
      return props.placeholder ?? format ?? defaultFornat;
    }
    if (type === 'date') {
      return props.placeholder ?? format ?? defaultFornat;
    }
    return props.placeholder;
  })();

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

  const trailingIconComponent = ((): ComponentType | undefined => {
    if (type === 'date') {
      return CalendarMediumIcon;
    }
    return trailingIcon;
  })();

  const getInputMode = (() => {
    if (type === 'currency') {
      return 'decimal';
    }
    if (type === 'search') {
      return 'search';
    }
    return undefined;
  })();

  return (
    <InputComponent
      {...(children ? props : {})}
      validationStatus={validationStatusFromContext}
      isInvalid={validationStatusFromContext === 'invalid'}
      isReadOnly={readonly}
      isDisabled={formFieldDisabled ?? disabled}
      isFocused={focused}
      type={type as undefined}
      isRequired={isRequired}
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
          {type === 'currency' && (
            <InputSlot>
              <DetailText
                size="4xl"
                style={{
                  // todo: fix this
                  ...(Platform.OS === 'ios' && { lineHeight: 46 }),
                }}
              >
                £
              </DetailText>
            </InputSlot>
          )}
          <InputField
            type={fieldType}
            inputMode={getInputMode}
            {...props}
            placeholder={getPlaceholder}
          />
          {shouldShowClear && (
            <InputSlot>
              <UnstyledIconButton onPress={onClear} icon={CloseSmallIcon} />
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
                icon={fieldType === 'password' ? EyeSmallIcon : EyeOffSmallIcon}
              />
            </InputSlot>
          )}
          {!!trailingIconComponent && (
            <InputSlot>
              <InputIcon as={trailingIconComponent} />
            </InputSlot>
          )}
        </>
      )}
    </InputComponent>
  );
};

Input.displayName = 'Input';

export default Input;
