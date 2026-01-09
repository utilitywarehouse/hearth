'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { mergeIds } from '../../helpers/merge-ids';
import { useIds } from '../../hooks/use-ids';
import type { TextAreaProps } from './TextArea.props';
import { Flex } from '../Flex/Flex';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormField } from '../FormField/FormField';

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
    minHeight: providedMinHeight,
    style,
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

  // we have to set the min-height on the textarea otherwise we break resizing,
  // so we need to account for borders and padding of the root container
  const borders = 'calc(var(--h-input-border-width) * 2)';
  const padding =
    'calc(var(--h-textarea-padding-bottom) + calc(var(--h-input-padding-vertical) * 2))';
  const minHeight = providedMinHeight
    ? `calc(${providedMinHeight} + ${borders} - ${padding})`
    : undefined;

  return (
    <FormField
      className={cn(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled ? '' : undefined}
      {...formFieldProps}
    >
      <Flex direction="column" className={`${componentClassName}Root`}>
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
          style={{ ...style, minHeight }}
          {...textAreaProps}
        />
      </Flex>
    </FormField>
  );
};

TextArea.displayName = COMPONENT_NAME;
