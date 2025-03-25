import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TextInputProps } from './TextInput.props';
import { extractProps } from '../../helpers/extract-props';
import clsx from 'clsx';
import React from 'react';
import { Label } from '../Label/Label';
import { SupportingText } from '../SupportingText/SupportingText';
import { Flex } from '../Flex/Flex';
import { useIds } from '../../hooks/use-ids';
import { ValidationText } from '../ValidationText/ValidationText';

const componentName = 'TextInput';
const componentClassName = withGlobalPrefix(componentName);

type TextInputElement = ElementRef<'input'>;

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>((props, ref) => {
  const {
    className,
    validationStatus,
    validationText,
    label,
    supportingText,
    children,
    id: providedId,
    disabled,
    readOnly,
    hideLabel,
    role,
    ...textInputProps
  } = extractProps(props);
  const { id, labelId, supportingTextId } = useIds({ providedId, prefix: 'input' });
  return (
    <div
      className={clsx(componentClassName, className)}
      role={role}
      data-validation-status={validationStatus ? validationStatus : undefined}
      data-disabled={disabled || readOnly ? '' : undefined}
    >
      <Flex direction="column" data-visually-hidden={hideLabel ? '' : undefined}>
        <Label htmlFor={id} id={labelId} disableUserSelect>
          {label}
        </Label>
        {supportingText ? (
          <SupportingText id={supportingTextId} disableUserSelect>
            {supportingText}
          </SupportingText>
        ) : null}
      </Flex>
      <div className="hearth-input-container">
        {children}
        <input
          ref={ref}
          spellCheck="false"
          id={id}
          aria-labelledby={labelId}
          aria-describedby={supportingTextId}
          aria-disabled={disabled}
          readOnly={readOnly || disabled}
          {...textInputProps}
        />
      </div>
      {validationStatus !== undefined && validationText !== undefined ? (
        <ValidationText status={validationStatus} disableUserSelect>
          {validationText}
        </ValidationText>
      ) : null}
    </div>
  );
});

TextInput.displayName = componentName;
