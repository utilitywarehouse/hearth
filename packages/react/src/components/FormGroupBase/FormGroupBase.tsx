'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';
import { cn } from '../../helpers/cn';
import type { FormGroupBaseProps } from './FormGroupBase.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormGroupBaseProvider } from './FormGroupBase.context';

const COMPONENT_NAME = 'FormGroupBase';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type FormGroupBaseElement = ComponentRef<'fieldset'>;

export const FormGroupBase = forwardRef<FormGroupBaseElement, FormGroupBaseProps>((props, ref) => {
  const {
    children,
    className,
    id: providedId,
    label,
    labelVariant = 'body',
    helperText,
    validationText,
    validationStatus,
    validationPlacement = 'top',
    disabled,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-errormessage': ariaErrorMessage,
    ...fieldsetProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'fieldset',
  });
  const hasLabel = Boolean(label);
  const hasHelperText = Boolean(helperText);
  const showValidationText = Boolean(validationStatus && validationText);
  const showInvalid = showValidationText && validationStatus === 'invalid';
  const ariaDescribedbyValue = mergeIds(
    ariaDescribedby || !!helperText ? helperTextId : undefined,
    ariaErrorMessage || showValidationText ? validationTextId : undefined
  );
  const value = {
    hasGroupHelperText: hasHelperText,
    hasGroupValidationText: Boolean(validationStatus !== undefined && validationText !== undefined),
    'aria-describedby': ariaDescribedbyValue,
  };

  return (
    <fieldset
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...fieldsetProps}
      disabled={disabled}
      id={id}
      data-disabled={disabled ? '' : undefined}
      aria-errormessage={ariaErrorMessage || showInvalid ? validationTextId : undefined}
      aria-labelledby={ariaLabelledby ?? (Boolean(label) ? labelId : undefined)}
      aria-invalid={showInvalid}
      aria-describedby={ariaDescribedbyValue}
      data-validation-status={validationStatus ? validationStatus : undefined}
    >
      {hasLabel ? (
        <>
          <legend id={labelId} data-label-variant={labelVariant}>
            {label}
          </legend>
          {hasHelperText || showValidationText ? (
            <Flex
              direction="column"
              alignItems="start"
              className={`${componentClassName}HelperTextContainer`}
            >
              {helperText ? (
                <HelperText id={helperTextId} disabled={disabled}>
                  {helperText}
                </HelperText>
              ) : null}
              {showValidationText && validationPlacement === 'top' ? (
                <ValidationText id={validationTextId} status={validationStatus}>
                  {validationText}
                </ValidationText>
              ) : null}
            </Flex>
          ) : null}
        </>
      ) : null}
      <FormGroupBaseProvider value={value}>{children}</FormGroupBaseProvider>
      {showValidationText && validationPlacement === 'bottom' ? (
        <ValidationText id={validationTextId} status={validationStatus}>
          {validationText}
        </ValidationText>
      ) : null}
    </fieldset>
  );
});

FormGroupBase.displayName = COMPONENT_NAME;
