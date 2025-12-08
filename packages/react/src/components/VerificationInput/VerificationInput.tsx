import React, { forwardRef, ElementRef } from 'react';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { verificationInputPropDefs, VerificationInputProps } from './VerificationInput.props';
import { FormField } from '../FormField/FormField';
import { useIds } from '../../hooks/use-ids';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'VerificationInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const VerificationInput = forwardRef<ElementRef<'div'>, VerificationInputProps>(
  (props, ref) => {
    const {
      className,
      onChange,
      disabled,
      readOnly,
      label,
      helperText,
      validationText,
      validationStatus,
      hideLabel,
      required,
      id: providedId,
      ...verificationInputProps
    } = extractProps(props, verificationInputPropDefs, marginPropDefs);

    const { id, labelId, helperTextId, validationTextId } = useIds({
      providedId,
      prefix: 'verification-input',
    });

    const showValidation = Boolean(!readOnly && !disabled);

    const formFieldProps = {
      id,
      labelId,
      helperTextId,
      validationTextId,
      label: label ?? '',
      helperText,
      validationText: showValidation ? validationText : undefined,
      validationStatus: showValidation ? validationStatus : undefined,
      hideLabel,
      required,
    };

    return (
      <FormField
        className={className}
        data-disabled={disabled ? '' : undefined}
        {...formFieldProps}
      >
        <OneTimePasswordField.Root
          ref={ref}
          className={componentClassName}
          onValueChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          data-validation-status={showValidation ? validationStatus : undefined}
          {...verificationInputProps}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <OneTimePasswordField.Input key={index} className={`${componentClassName}-slot`} />
          ))}
          <OneTimePasswordField.HiddenInput />
        </OneTimePasswordField.Root>
      </FormField>
    );
  }
);

VerificationInput.displayName = COMPONENT_NAME;
