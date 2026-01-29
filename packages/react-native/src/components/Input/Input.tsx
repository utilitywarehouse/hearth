import { createInput } from '@gluestack-ui/input';
import { ComponentType, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import type InputProps from './Input.props';

import {
  CloseSmallIcon,
  EyeOffSmallIcon,
  EyeSmallIcon,
  SearchMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useTheme } from '../../hooks';
import { FormField, useFormFieldContext } from '../FormField';
import { Spinner } from '../Spinner';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { InputWithoutChildrenProps } from './Input.props';
import InputFieldComponent from './InputField';
import InputIconComponent from './InputIcon';
import InputRoot from './InputRoot';
import InputSlotComponent from './InputSlot';

export const InputComponent = createInput({
  Icon: InputIconComponent,
  Slot: InputSlotComponent,
  Root: InputRoot,
  Input: InputFieldComponent,
});

export const InputSlot = InputComponent.Slot;
export const InputField = InputComponent.Input;
export const InputIcon = InputComponent.Icon;

const Input = forwardRef<TextInput, InputProps>(
  (
    {
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
      loading,
      clearable = false,
      required = true,
      inBottomSheet = false,
      style,
      label,
      labelVariant,
      helperText,
      helperIcon,
      validText,
      invalidText,
      ...props
    },
    ref
  ) => {
    const formFieldContext = useFormFieldContext();
    const inputLabel = label ?? formFieldContext?.label;
    const inputHelperText = helperText ?? formFieldContext?.helperText;
    const inputValidText = validText ?? formFieldContext?.validText;
    const inputInvalidText = invalidText ?? formFieldContext?.invalidText;
    const inputRequired = required ?? formFieldContext?.required;
    const inputDisabled = disabled ?? formFieldContext?.disabled;
    const inputReadonly = readonly ?? formFieldContext?.readonly;
    const inputValidationStatus = formFieldContext?.validationStatus ?? validationStatus;

    useEffect(() => {
      if (formFieldContext?.setShouldHandleAccessibility) {
        formFieldContext.setShouldHandleAccessibility(true);
      }
    }, []);

    const [fieldType, setFieldType] = useState<'password' | 'text'>(
      type === 'password' ? 'password' : 'text'
    );
    const { color } = useTheme();
    const inputRef = useRef<TextInput>(null);

    // Expose TextInput methods to parent components
    useImperativeHandle(ref, () => inputRef.current as TextInput, []);

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

    const getInputMode = (() => {
      if (type === 'search') {
        return 'search';
      }
      return undefined;
    })();

    const getAccessibilityLabel = () => {
      let accessibilityLabel = '';
      if (inputLabel) {
        accessibilityLabel = accessibilityLabel + inputLabel;
      }
      if (inputRequired) {
        accessibilityLabel = accessibilityLabel + ', required';
      }

      return accessibilityLabel || props.accessibilityLabel;
    };

    const getAccessibilityHint = () => {
      let accessibilityHint = '';
      if (inputHelperText) {
        accessibilityHint = accessibilityHint + inputHelperText;
      }
      if (inputValidationStatus !== 'initial') {
        if (accessibilityHint.length > 0) {
          accessibilityHint = accessibilityHint + ', ';
        }
        if (inputValidationStatus === 'invalid' && inputInvalidText) {
          accessibilityHint = accessibilityHint + inputInvalidText;
        }
        if (inputValidationStatus === 'valid' && inputValidText) {
          accessibilityHint = accessibilityHint + inputValidText;
        }
      }
      return accessibilityHint || props.accessibilityHint;
    };

    return (
      <FormField
        label={label}
        labelVariant={labelVariant}
        helperText={helperText}
        helperIcon={helperIcon}
        validText={validText}
        invalidText={invalidText}
        required={required}
        validationStatus={validationStatus}
        disabled={disabled}
        readonly={readonly}
        accessibilityHandledByChildren
      >
        <InputComponent
          {...(children ? props : {})}
          validationStatus={inputValidationStatus}
          isInvalid={inputValidationStatus === 'invalid'}
          isReadOnly={inputReadonly}
          isDisabled={inputDisabled}
          isFocused={focused}
          type={type as undefined}
          isRequired={inputRequired}
          style={style}
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
              <InputField
                // @ts-expect-error - ref forwarding issue
                ref={inputRef}
                type={fieldType}
                inputMode={getInputMode}
                inBottomSheet={inBottomSheet}
                {...props}
                aria-label={getAccessibilityLabel()}
                accessibilityHint={getAccessibilityHint()}
              />
              {shouldShowClear && (
                <InputSlot>
                  <UnstyledIconButton onPress={onClear} icon={CloseSmallIcon} />
                </InputSlot>
              )}
              {loading && (
                <InputSlot>
                  <Spinner size="xs" color={color.icon.primary} />
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
              {!!trailingIcon && (
                <InputSlot>
                  <InputIcon as={trailingIcon} />
                </InputSlot>
              )}
            </>
          )}
        </InputComponent>
      </FormField>
    );
  }
);

Input.displayName = 'Input';

export default Input;
