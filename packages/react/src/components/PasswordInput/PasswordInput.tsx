'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { cn } from '../../helpers/cn';
import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import type { RefObject } from 'react';
import type { PasswordInputProps } from './PasswordInput.props';
import { TextInput } from '../TextInput/TextInput';
import { InputSlot } from '../InputSlot/InputSlot';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { EyeOffSmallIcon, EyeSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import type { InputBaseElement } from '../InputBase/InputBase';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'PasswordInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const PasswordInput = forwardRef<InputBaseElement, PasswordInputProps>(
  ({ className, disabled, id: providedId, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useMergedRefs(forwardedRef, internalRef);

    const [visible, setVisible] = useState(false);
    const [showVisibilityMessage, setShowVisibilityMessage] = useState(false);

    const handleVisibility = useCallback(() => {
      const newVisibilityState = !visible;
      const newVisibilityMessageState = !showVisibilityMessage;
      setVisible(newVisibilityState);
      setShowVisibilityMessage(newVisibilityMessageState);
    }, [visible, showVisibilityMessage]);

    // If the PasswordInput is inside a form we should switch the input type
    // back to password when its parent form is submitted
    useEffect(() => {
      // Get the ref value and ensure proper typing
      let currentElement: HTMLInputElement | null = null;
      if (internalRef && typeof internalRef === 'object' && internalRef.current) {
        // Type assertion to ensure TypeScript understands this is a valid ref object
        const refObject = internalRef as RefObject<HTMLInputElement>;
        currentElement = refObject.current;
      }

      const handleSubmit = () => {
        if (currentElement?.type) {
          currentElement.type = 'password';
          setVisible(false);
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
    }, [internalRef]);

    const visibilityMessage = `Your password is ${visible ? 'shown' : 'hidden'}!`;

    useEffect(() => {
      setTimeout(() => {
        setShowVisibilityMessage(false);
      }, 1500);
    }, [showVisibilityMessage]);

    const { id } = useIds({ providedId, prefix: 'password-input' });

    return (
      <>
        <TextInput
          ref={inputRef}
          className={cn(componentClassName, className)}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          id={id}
          data-testid={componentClassName}
          {...props}
        >
          <InputSlot placement="suffix">
            <UnstyledIconButton
              type="button"
              label="toggle password visibility"
              onClick={handleVisibility}
              disabled={disabled}
              aria-pressed={visible}
            >
              {visible ? <EyeSmallIcon /> : <EyeOffSmallIcon />}
            </UnstyledIconButton>
          </InputSlot>
        </TextInput>
        <div data-visually-hidden aria-live="assertive" role="status">
          {showVisibilityMessage ? visibilityMessage : ''}
        </div>
      </>
    );
  }
);

PasswordInput.displayName = COMPONENT_NAME;
