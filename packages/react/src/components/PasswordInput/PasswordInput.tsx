import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import type { MouseEvent } from 'react';
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
    const handleVisibility = React.useCallback(() => {
      const newState = !visible;
      setVisible(newState);

      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef, visible]);

    return (
      <TextInput
        ref={inputRef}
        className={clsx(componentClassName, className)}
        type={visible ? 'text' : 'password'}
        disabled={disabled}
        {...props}
      >
        <TextInputSlot placement="suffix">
          <UnstyledIconButton
            label="toggle password visibility"
            onClick={handleVisibility}
            disabled={disabled}
          >
            {visible ? <EyeMediumIcon /> : <EyeOffMediumIcon />}
          </UnstyledIconButton>
        </TextInputSlot>
      </TextInput>
    );
  }
);

PasswordInput.displayName = componentName;
