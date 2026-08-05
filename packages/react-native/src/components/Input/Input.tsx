import {
  ComponentType,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput, ViewProps } from 'react-native';
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
import { InputContext } from './Input.context';
import { InputWithoutChildrenProps } from './Input.props';
import InputFieldComponent from './InputField';
import InputIconComponent from './InputIcon';
import InputRoot from './InputRoot';
import InputSlotComponent from './InputSlot';

type InputComponentProps = Omit<ViewProps, 'children'> & {
  children?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  focused?: boolean;
  validationStatus?: InputProps['validationStatus'];
  type?: InputProps['type'];
};

export const InputComponent = ({
  children,
  disabled,
  invalid,
  readOnly,
  required,
  focused,
  validationStatus,
  type,
  ...props
}: InputComponentProps) => {
  const [isFocused, setFocused] = useState(false);
  const resolvedFocused = focused || isFocused;
  // invalid is accepted for API compatibility with existing callers (e.g. StepperInput) but
  // is always passed alongside an equivalent validationStatus, which drives styling directly.
  void invalid;

  const contextValue = useMemo(
    () => ({
      disabled,
      focused: resolvedFocused,
      readonly: readOnly,
      validationStatus,
      required,
      type,
      setFocused,
    }),
    [disabled, resolvedFocused, readOnly, validationStatus, required, type]
  );

  return (
    <InputContext.Provider value={contextValue}>
      {/* InputRoot's props are typed as a discriminated union keyed on `type`, which doesn't
          fit this generic wrapper — cast, as the props are passed straight through to a View. */}
      <InputRoot
        {...(props as any)}
        validationStatus={validationStatus}
        type={type as any}
        states={{ focus: resolvedFocused, disabled, readonly: readOnly }}
      >
        {children}
      </InputRoot>
    </InputContext.Provider>
  );
};

export const InputSlot = InputSlotComponent;
export const InputField = InputFieldComponent;
export const InputIcon = InputIconComponent;

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
          invalid={inputValidationStatus === 'invalid'}
          readOnly={inputReadonly}
          disabled={inputDisabled}
          focused={focused}
          type={type as undefined}
          required={inputRequired}
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
