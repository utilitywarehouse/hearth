import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { mergeIds } from '../../helpers/merge-ids';
import { useIds } from '../../hooks/use-ids';
import { TextAreaProps } from './TextArea.props';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';
import { Flex } from '../Flex/Flex';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'TextArea';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type TextAreaElement = ElementRef<'textarea'>;

export const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, ref) => {
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
    resize,
    rows = 3,
    ...textAreaProps
  } = extractProps(props, marginPropDefs);
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
    <Flex
      direction="column"
      gap="75"
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled ? '' : undefined}
    >
      <Flex direction="column">
        <Label htmlFor={id} id={labelId} disableUserSelect fontWeight="semibold">
          {label}
          {required ? null : (
            <BodyText as="span" marginLeft="50">
              (optional)
            </BodyText>
          )}
        </Label>
        {helperText ? (
          <HelperText id={helperTextId} disableUserSelect>
            {helperText}
          </HelperText>
        ) : null}
      </Flex>
      <Flex direction="column" className="hearth-TextAreaRoot">
        <textarea
          ref={ref}
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
          data-resize={resize}
          {...textAreaProps}
        />
      </Flex>
      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </Flex>
  );
});

TextArea.displayName = displayName;
