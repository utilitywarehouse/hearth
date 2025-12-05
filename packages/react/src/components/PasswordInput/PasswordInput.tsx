'use client';

import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { PasswordInputProps } from './PasswordInput.props';
import { TextInput } from '../TextInput/TextInput';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { EyeOffSmallIcon, EyeSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';

const COMPONENT_NAME = 'PasswordInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type PasswordInputElement = ElementRef<'input'>;

export const PasswordInput = React.forwardRef<PasswordInputElement, PasswordInputProps>(
  ({ className, disabled, id: providedId, ...props }, forwardedRef) => {
    const defaultRef = React.useRef<HTMLInputElement | null>(null);
    const inputRef = forwardedRef || defaultRef;
    const [visible, setVisible] = React.useState(false);
    const [showVisibilityMessage, setShowVisibilityMessage] = React.useState(false);

    const handleVisibility = React.useCallback(() => {
      const newVisibilityState = !visible;
      const newVisibilityMessageState = !showVisibilityMessage;
      setVisible(newVisibilityState);
      setShowVisibilityMessage(newVisibilityMessageState);
    }, [visible, showVisibilityMessage]);

    // If the PasswordInput is inside a form we should switch the input type
    // back to password when its parent form is submitted
    React.useEffect(() => {
      // Get the ref value and ensure proper typing
      let currentElement: HTMLInputElement | null = null;
      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        // Type assertion to ensure TypeScript understands this is a valid ref object
        const refObject = inputRef as React.RefObject<HTMLInputElement>;
        currentElement = refObject.current;
      }

      const handleSubmit = () => {
        if (currentElement?.type) {
          currentElement.type = 'password';
        }
      };

      if (currentElement && currentElement.form !== null) {
        currentElement.form.addEventListener('submit', handleSubmit);
      }
      return () => {
        if (currentElement?.form) {
          currentElement.form.removeEventListener('submit', handleSubmit);
        }
      };
    }, [inputRef]);

    const visibilityMessage = `Your password is ${visible ? 'shown' : 'hidden'}!`;

    React.useEffect(() => {
      setTimeout(() => {
        setShowVisibilityMessage(false);
      }, 1500);
    }, [showVisibilityMessage]);

    const { id } = useIds({ providedId, prefix: 'password-input' });

    return (
      <>
        <TextInput
          ref={inputRef}
          className={clsx(componentClassName, className)}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          id={id}
          {...props}
        >
          <TextInputSlot placement="suffix">
            <UnstyledIconButton
              type="button"
              label="toggle password visibility"
              onClick={handleVisibility}
              disabled={disabled}
              aria-pressed={visible}
            >
              {visible ? <EyeSmallIcon /> : <EyeOffSmallIcon />}
            </UnstyledIconButton>
          </TextInputSlot>
        </TextInput>
        <div data-visually-hidden aria-live="assertive" role="status">
          {showVisibilityMessage ? visibilityMessage : ''}
        </div>
      </>
    );
  }
);

PasswordInput.displayName = COMPONENT_NAME;
