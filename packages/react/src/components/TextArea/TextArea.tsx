'use client';

import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { mergeIds } from '../../helpers/merge-ids';
import { useIds } from '../../hooks/use-ids';
import { TextAreaProps } from './TextArea.props';
import { Flex } from '../Flex/Flex';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormField } from '../FormField/FormField';

const COMPONENT_NAME = 'TextArea';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

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
    'aria-describedby': ariaDescribedby,
    resize,
    rows = 3,
    ...textAreaProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'textarea',
  });

  const showValidation = Boolean(!readOnly && !disabled);

  const formFieldProps = {
    id,
    labelId,
    helperTextId,
    validationTextId,
    label,
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

  return (
    <FormField
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled ? '' : undefined}
      {...formFieldProps}
    >
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
    </FormField>
  );
});

TextArea.displayName = COMPONENT_NAME;
