import * as React from 'react';
import type { ElementRef } from 'react';

import { FormFieldGroupProvider } from './FormFieldGroup.context';
import type { FormFieldGroupProps } from './FormFieldGroup.props';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Fieldset } from '../Fieldset/Fieldset';
import { Flex } from '../Flex/Flex';
import { FieldsetLegend } from '../FieldsetLegend/FieldsetLegend';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';

const componentName = 'FormFieldGroup';

type FormFieldGroupElement = ElementRef<'fieldset'>;

export const FormFieldGroup = React.forwardRef<FormFieldGroupElement, FormFieldGroupProps>(
  (
    {
      id: providedId,
      children,
      label,
      helperText,
      validationText,
      validationStatus,
      disabled,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-errormessage': ariaErrorMessage,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId, validationTextId } = useIds({
      providedId,
      prefix: 'formfieldgroup',
    });
    const showValidationText = Boolean(validationStatus && validationText);
    const ariaDescribedbyValue = mergeIds(
      ariaDescribedby || !!helperText ? helperTextId : undefined,
      ariaErrorMessage || showValidationText ? validationTextId : undefined
    );
    const value = {
      hasGroupHelperText: Boolean(helperText !== undefined),
      hasGroupValidationText: Boolean(
        validationStatus !== undefined && validationText !== undefined
      ),
      'aria-describedby': ariaDescribedbyValue,
    };

    return (
      <Fieldset
        ref={ref}
        {...props}
        disabled={disabled}
        id={id}
        data-disabled={disabled ? '' : undefined}
        aria-errormessage={ariaErrorMessage || showValidationText ? validationTextId : undefined}
        aria-labelledby={ariaLabelledby || !!label ? labelId : undefined}
        aria-invalid={showValidationText}
        aria-describedby={ariaDescribedbyValue}
      >
        {label ? (
          <Flex direction="column" align="start">
            {label ? <FieldsetLegend id={labelId}>{label}</FieldsetLegend> : null}
            {helperText ? (
              <HelperText id={helperTextId} disabled={disabled}>
                {helperText}
              </HelperText>
            ) : null}
            {showValidationText ? (
              <ValidationText id={validationTextId} status={validationStatus}>
                {validationText}
              </ValidationText>
            ) : null}
          </Flex>
        ) : null}

        <FormFieldGroupProvider value={value}>{children}</FormFieldGroupProvider>
      </Fieldset>
    );
  }
);

FormFieldGroup.displayName = componentName;
