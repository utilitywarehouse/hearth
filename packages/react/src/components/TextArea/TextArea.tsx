import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { mergeIds } from '../../helpers/merge-ids';
import { useIds } from '../../hooks/use-ids';
import { TextAreaProps } from './TextArea.props';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';
import { Flex } from '../Flex/Flex';

const componentName = 'TextArea';
const componentClassName = withGlobalPrefix(componentName);

type TextAreaElement = ElementRef<'textarea'>;

export const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const {
    className,
    validationStatus,
    validationText,
    label,
    helperText,
    id: providedId,
    disabled,
    readOnly,
    required,
    placeholder,
    rows = 3,
    ...textAreaProps
  } = extractProps(props);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'textarea',
  });

  const showValidationText = Boolean(
    !readOnly && !disabled && validationStatus !== undefined && validationText !== undefined
  );

  const ariaDescribedbyValue = mergeIds(
    !!helperText ? helperTextId : undefined,
    showValidationText ? validationTextId : undefined
  );

  return (
    <div
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <Flex direction="column">
        <Label htmlFor={id} id={labelId} disableUserSelect fontWeight="semibold">
          {label}
          {required ? null : (
            <span style={{ marginLeft: '0.25rem', fontWeight: 'normal' }}>(optional)</span>
          )}
        </Label>
        {helperText ? (
          <HelperText id={helperTextId} disableUserSelect>
            {helperText}
          </HelperText>
        ) : null}
      </Flex>
      <textarea
        ref={forwardedRef}
        id={id}
        rows={rows}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={!disabled ? placeholder : undefined}
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedbyValue}
        aria-invalid={validationStatus === 'invalid' ? true : undefined}
        aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
        {...textAreaProps}
      />
      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </div>
  );
});

TextArea.displayName = componentName;
