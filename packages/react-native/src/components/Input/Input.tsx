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
import { useFormFieldAccessibility, useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
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
      prefix,
      suffix,
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
    }, [formFieldContext]);

    const [fieldType, setFieldType] = useState<'password' | 'text'>(
      type === 'password' ? 'password' : 'text'
    );
    const { color } = useTheme();
    const inputRef = useRef<TextInput>(null);

    // Expose TextInput methods to parent components
    useImperativeHandle(ref, () => inputRef.current as TextInput, []);

    const shouldShowPasswordToggle = type === 'password' && showPasswordToggle;
    const shouldShowClear = clearable && !!(props as InputWithoutChildrenProps)?.value;
    const { accessibilityHint, accessibilityLabel } = useFormFieldAccessibility({
      label: inputLabel,
      helperText: inputHelperText,
      validText: inputValidText,
      invalidText: inputInvalidText,
      required: inputRequired,
      validationStatus: inputValidationStatus,
      fallbackLabel: props.accessibilityLabel,
      fallbackHint: props.accessibilityHint,
    });

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
              {!!prefix && (
                <InputSlot>
                  {typeof prefix === 'string' || typeof prefix === 'number' ? (
                    <BodyText>{prefix}</BodyText>
                  ) : (
                    prefix
                  )}
                </InputSlot>
              )}
              <InputField
                // @ts-expect-error - ref forwarding issue
                ref={inputRef}
                type={fieldType}
                inputMode={getInputMode}
                inBottomSheet={inBottomSheet}
                {...props}
                aria-label={accessibilityLabel}
                accessibilityHint={accessibilityHint}
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
              {!!suffix && (
                <InputSlot>
                  {typeof suffix === 'string' || typeof suffix === 'number' ? (
                    <BodyText>{suffix}</BodyText>
                  ) : (
                    suffix
                  )}
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
