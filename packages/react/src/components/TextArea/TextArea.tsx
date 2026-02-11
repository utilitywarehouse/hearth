'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { mergeIds } from '../../helpers/merge-ids';
import { useIds } from '../../hooks/use-ids';
import type { TextAreaProps } from './TextArea.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormField } from '../FormField/FormField';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'TextArea';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TextArea = (props: TextAreaProps) => {
  const {
    className,
    validationStatus,
    validationText,
    label,
    labelVariant,
    helperText,
    id: providedId,
    disabled,
    readOnly,
    required,
    placeholder,
    'aria-describedby': ariaDescribedby,
    resize,
    rows = 3,
    minHeight,
    maxHeight,
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

  return (
    <FormField
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled ? '' : undefined}
      className={cn(componentClassName, className)}
      {...formFieldProps}
    >
      <Box asChild minHeight={minHeight} maxHeight={maxHeight}>
        <textarea
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
      </Box>
    </FormField>
  );
};

TextArea.displayName = COMPONENT_NAME;
