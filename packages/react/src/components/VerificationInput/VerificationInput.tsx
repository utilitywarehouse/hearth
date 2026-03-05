'use client';

import { unstable_OneTimePasswordField as OneTimePasswordFieldPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { VerificationInputProps } from './VerificationInput.props';
import { FormField } from '../FormField/FormField';
import { useIds } from '../../hooks/use-ids';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { InputBase } from '../InputBase/InputBase';
import { cn } from '../../helpers/cn';
import { mergeIds } from '../../helpers/merge-ids';
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'VerificationInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export type VerificationInputElement = ComponentRef<'input'>;

export const VerificationInput = forwardRef<VerificationInputElement, VerificationInputProps>(
  (props, ref) => {
    const {
      className,
      disabled,
      readOnly,
      label,
      labelVariant,
      helperText,
      validationText,
      validationStatus,
      required,
      id: providedId,
      'aria-describedby': ariaDescribedby,
      ...verificationInputProps
    } = extractProps(props, marginPropDefs);

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
      label,
      labelVariant,
      helperText,
      validationText: showValidation ? validationText : undefined,
      validationStatus: showValidation ? validationStatus : undefined,
      required,
    };

    const ariaDescribedbyValue = mergeIds(
      ariaDescribedby,
      !!helperText ? helperTextId : undefined,
      showValidation && validationText !== undefined ? validationTextId : undefined
    );

    const PASSWORD_LENGTH = 6;

    return (
      <FormField
        className={cn(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        {...formFieldProps}
      >
        <OneTimePasswordFieldPrimitive.Root
          className={`${componentClassName}Root`}
          disabled={disabled}
          readOnly={readOnly}
          aria-labelledby={labelId}
          aria-describedby={ariaDescribedbyValue}
          aria-invalid={validationStatus === 'invalid' ? true : undefined}
          aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
          data-validation-status={showValidation ? validationStatus : undefined}
          {...verificationInputProps}
        >
          {Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
            <OneTimePasswordFieldPrimitive.Input key={i} asChild>
              <InputBase />
            </OneTimePasswordFieldPrimitive.Input>
          ))}

          <OneTimePasswordFieldPrimitive.HiddenInput ref={ref} />
        </OneTimePasswordFieldPrimitive.Root>
      </FormField>
    );
  }
);

VerificationInput.displayName = COMPONENT_NAME;
