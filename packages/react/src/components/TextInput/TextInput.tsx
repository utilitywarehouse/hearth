import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TextInputProps } from './TextInput.props';
import { extractProps } from '../../helpers/extract-props';
import clsx from 'clsx';
import React from 'react';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { useIds } from '../../hooks/use-ids';
import { ValidationText } from '../ValidationText/ValidationText';
import { mergeIds } from '../../helpers/merge-ids';
import { BodyText } from '../BodyText/BodyText';
import { marginPropDefs } from '../../props/margin.props';
import { InputBase } from '../InputBase/InputBase';

const COMPONENT_NAME = 'TextInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TextInputElement = ElementRef<'input'>;

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>((props, ref) => {
  const {
    className,
    validationStatus,
    validationText,
    label,
    helperText,
    children,
    id: providedId,
    disabled,
    readOnly,
    hideLabel,
    required,
    placeholder,
    'aria-describedby': ariaDescribedby,
    ...textInputProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'input',
  });

  const showValidationText = Boolean(
    !readOnly && !disabled && validationStatus !== undefined && validationText !== undefined
  );
  const ariaDescribedbyValue = mergeIds(
    ariaDescribedby,
    !!helperText ? helperTextId : undefined,
    showValidationText ? validationTextId : undefined
  );

  return (
    <Flex
      className={clsx(componentClassName, className)}
      direction="column"
      gap="75"
      data-disabled={disabled ? '' : undefined}
    >
      <Flex direction="column" data-visually-hidden={hideLabel ? '' : undefined}>
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
      <InputBase
        ref={ref}
        spellCheck="false"
        id={id}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        validationStatus={validationStatus}
        placeholder={!disabled ? placeholder : undefined}
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedbyValue}
        aria-invalid={validationStatus === 'invalid' ? true : undefined}
        aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
        {...textInputProps}
      >
        {children}
      </InputBase>
      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </Flex>
  );
});

TextInput.displayName = COMPONENT_NAME;
