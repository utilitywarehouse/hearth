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

const COMPONENT_NAME = 'TextInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TextInputElement = ElementRef<'input'>;

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>(
  (props, forwardedRef) => {
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

    const defaultRef = React.useRef<HTMLInputElement>(null);
    const inputRef = forwardedRef || defaultRef;
    return (
      <Flex
        className={clsx(componentClassName, className)}
        direction="column"
        gap="75"
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
        <div className="hearth-TextInputRoot">
          <input
            ref={inputRef}
            spellCheck="false"
            id={id}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={!disabled ? placeholder : undefined}
            aria-labelledby={labelId}
            aria-describedby={ariaDescribedbyValue}
            aria-invalid={validationStatus === 'invalid' ? true : undefined}
            aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
            {...textInputProps}
          />
          {children}
        </div>
        {showValidationText ? (
          <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
            {validationText}
          </ValidationText>
        ) : null}
      </Flex>
    );
  }
);

TextInput.displayName = COMPONENT_NAME;
