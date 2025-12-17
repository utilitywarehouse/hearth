'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TextInputProps } from './TextInput.props';
import { extractProps } from '../../helpers/extract-props';
import clsx from 'clsx';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { marginPropDefs } from '../../props/margin.props';
import { InputBase } from '../InputBase/InputBase';
import { FormField } from '../FormField/FormField';

const COMPONENT_NAME = 'TextInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TextInput = (props: TextInputProps) => {
  const {
    className,
    validationStatus,
    validationText,
    label,
    labelVariant,
    helperText,
    children,
    id: providedId,
    disabled,
    readOnly,
    hideLabel,
    required,
    placeholder,
    'aria-describedby': ariaDescribedby,
    ...textInputProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'text-input',
  });

  const showValidation = Boolean(!readOnly && !disabled);

  const formFieldProps = {
    id,
    labelId,
    helperTextId,
    validationTextId,
    label,
    labelVariant,
    helperText,
    validationText: showValidation ? validationText : undefined,
    validationStatus: showValidation ? validationStatus : undefined,
    hideLabel,
    required,
  };

  const ariaDescribedbyValue = mergeIds(
    ariaDescribedby,
    !!helperText ? helperTextId : undefined,
    showValidation && validationText !== undefined ? validationTextId : undefined
  );

  return (
    <FormField
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      {...formFieldProps}
    >
      <InputBase
        spellCheck="false"
        id={id}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={!disabled ? placeholder : undefined}
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedbyValue}
        aria-invalid={validationStatus === 'invalid' ? true : undefined}
        aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
        {...textInputProps}
      >
        {children}
      </InputBase>
    </FormField>
  );
};

TextInput.displayName = COMPONENT_NAME;
