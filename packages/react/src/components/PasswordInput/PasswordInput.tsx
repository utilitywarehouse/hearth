import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { PasswordInputProps } from './PasswordInput.props';
import { TextInput } from '../TextInput/TextInput';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import { EyeMediumIcon, EyeOffMediumIcon } from '@utilitywarehouse/react-icons';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';

const componentName = 'PasswordInput';
const componentClassName = withGlobalPrefix(componentName);

type PasswordInputElement = ElementRef<'input'>;

export const PasswordInput = React.forwardRef<PasswordInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, forwardedRef) => {
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
      if (
        inputRef &&
        typeof inputRef === 'object' &&
        inputRef.current &&
        inputRef.current.form !== null
      ) {
        inputRef.current.form.addEventListener('submit', () => {
          if (inputRef.current?.type) {
            inputRef.current.type = 'password';
          }
        });
      }
    }, [inputRef]);

    const visibilityMessage = `Your password is ${visible ? 'shown' : 'hidden'}!`;

    React.useEffect(() => {
      setTimeout(() => {
        setShowVisibilityMessage(false);
      }, 1500);
    }, [showVisibilityMessage]);

    return (
      <>
        <TextInput
          ref={inputRef}
          className={clsx(componentClassName, className)}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
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
              {visible ? <EyeMediumIcon /> : <EyeOffMediumIcon />}
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

PasswordInput.displayName = componentName;
