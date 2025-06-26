import * as React from 'react';
import type { ElementRef } from 'react';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';
import clsx from 'clsx';
import type { FormGroupBaseProps } from './FormGroupBase.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormGroupBaseProvider } from './FormGroupBase.context';

const componentName = 'FormGroupBase';
const componentClassName = withGlobalPrefix(componentName);

type FormGroupBaseElement = ElementRef<'fieldset'>;

export const FormGroupBase = React.forwardRef<FormGroupBaseElement, FormGroupBaseProps>(
  (props, ref) => {
    const {
      children,
      className,
      id: providedId,
      label,
      helperText,
      validationText,
      validationStatus,
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
      hasGroupValidationText: Boolean(
        validationStatus !== undefined && validationText !== undefined
      ),
      'aria-describedby': ariaDescribedbyValue,
    };

    return (
      <fieldset
        className={clsx(componentClassName, className)}
        ref={ref}
        {...fieldsetProps}
        disabled={disabled}
        id={id}
        data-disabled={disabled ? '' : undefined}
        aria-errormessage={ariaErrorMessage || showInvalid ? validationTextId : undefined}
        aria-labelledby={ariaLabelledby ?? (Boolean(label) ? labelId : undefined)}
        aria-invalid={showInvalid}
        aria-describedby={ariaDescribedbyValue}
      >
        {hasLabel ? (
          <>
            <legend id={labelId} className="hearth-Legend">
              {label}
            </legend>
            {hasHelperText || showValidationText ? (
              <Flex direction="column" alignItems="start" className="hearth-HelperTextContainer">
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
          </>
        ) : null}
        <FormGroupBaseProvider value={value}>{children}</FormGroupBaseProvider>
      </fieldset>
    );
  }
);

FormGroupBase.displayName = componentName;
