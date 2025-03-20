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
    ...textInputProps
  } = extractProps(props);
  const { id, labelId, supportingTextId } = useIds({ providedId, componentPrefix: componentName });
  return (
    <div
      ref={ref}
      data-validation-status={validationStatus ? validationStatus : undefined}
      className={clsx(componentClassName, className)}
    >
      <Flex direction="column">
        <Label htmlFor={id} id={labelId}>
          {label}
        </Label>
        {supportingText ? (
          <SupportingText id={supportingTextId}>{supportingText}</SupportingText>
        ) : null}
      </Flex>
      <div className="hearth-input-container">
        {children}
        <input
          spellCheck="false"
          id={id}
          aria-labelledby={labelId}
          aria-describedby={supportingTextId}
          {...textInputProps}
        />
      </div>
      {validationStatus !== undefined && validationText !== undefined ? (
        <ValidationText status={validationStatus}>{validationText}</ValidationText>
      ) : null}
    </div>
  );
});

TextInput.displayName = componentName;
