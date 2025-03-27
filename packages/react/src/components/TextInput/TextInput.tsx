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
import { mergeIds } from '../../helpers/merge-ids';
import { BodyText } from '../BodyText/BodyText';

const componentName = 'TextInput';
const componentClassName = withGlobalPrefix(componentName);

type TextInputElement = ElementRef<'input'>;

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>(
  (props, forwardedRef) => {
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
      required,
      ...textInputProps
    } = extractProps(props);
    const { id, labelId, supportingTextId, validationTextId } = useIds({
      providedId,
      prefix: 'input',
    });

    const showValidationText = Boolean(
      validationStatus !== undefined && validationText !== undefined
    );
    const ariaDescribedbyValue = mergeIds(
      !!supportingText ? supportingTextId : undefined,
      showValidationText ? validationTextId : undefined
    );

    const defaultRef = React.useRef<HTMLInputElement>(null);
    const inputRef = forwardedRef || defaultRef;
    return (
      <div
        className={clsx(componentClassName, className)}
        role={role}
        data-validation-status={validationStatus ? validationStatus : undefined}
        data-disabled={disabled ? '' : undefined}
        onPointerDown={event => {
          // avoid losing focus when users click on non-interactive slot elements, such as icons
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          if (inputRef && typeof inputRef === 'object' && inputRef.current) {
            const input = inputRef.current;
            requestAnimationFrame(() => {
              input.focus();
            });
          }
        }}
      >
        <Flex direction="column" data-visually-hidden={hideLabel ? '' : undefined}>
          <Label htmlFor={id} id={labelId} disableUserSelect>
            {label} {required ? null : <BodyText as="span">(optional)</BodyText>}
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
            ref={inputRef}
            spellCheck="false"
            id={id}
            required={required}
            aria-labelledby={labelId}
            aria-describedby={ariaDescribedbyValue}
            aria-disabled={disabled || readOnly}
            aria-invalid={validationStatus === 'invalid' ? true : undefined}
            aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
            readOnly={readOnly || disabled}
            {...textInputProps}
          />
        </div>
        {showValidationText ? (
          <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
            {validationText}
          </ValidationText>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = componentName;
