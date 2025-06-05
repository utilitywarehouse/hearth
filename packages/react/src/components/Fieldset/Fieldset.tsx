import * as React from 'react';
import type { ElementRef } from 'react';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';
import clsx from 'clsx';
import type { FieldsetProps } from './Fieldset.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FieldsetProvider } from './Fieldset.context';
import { Legend } from '../Legend/Legend';

const componentName = 'Fieldset';
const componentClassName = withGlobalPrefix(componentName);

type FieldsetElement = ElementRef<'fieldset'>;

export const Fieldset = React.forwardRef<FieldsetElement, FieldsetProps>((props, ref) => {
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
    prefix: 'formfieldgroup',
  });
  const hasLabel = Boolean(label);
  const hasHelperText = Boolean(helperText);
  const showValidationText = Boolean(validationStatus && validationText);
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
      className={clsx(componentClassName, className)}
      ref={ref}
      {...fieldsetProps}
      disabled={disabled}
      id={id}
      data-disabled={disabled ? '' : undefined}
      aria-errormessage={ariaErrorMessage || showValidationText ? validationTextId : undefined}
      aria-labelledby={ariaLabelledby ?? (Boolean(label) ? labelId : undefined)}
      aria-invalid={showValidationText}
      aria-describedby={ariaDescribedbyValue}
    >
      {hasLabel ? (
        <>
          <Legend id={labelId}>{label}</Legend>
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
      <FieldsetProvider value={value}>{children}</FieldsetProvider>
    </fieldset>
  );
});

Fieldset.displayName = componentName;
