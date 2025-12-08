'use client';

import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { InputBaseProps } from './InputBase.props';

const COMPONENT_NAME = 'InputBase';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type InputBaseElement = ElementRef<'input'>;

export const InputBase = React.forwardRef<InputBaseElement, InputBaseProps>(
  ({ className, children, disabled, readOnly, required, placeholder, ...props }, forwardedRef) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const inputRef = forwardedRef || defaultRef;
    return (
      <div
        className={clsx(componentClassName, className)}
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
        <input
          ref={inputRef}
          spellCheck="false"
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={!disabled ? placeholder : undefined}
          {...props}
        />
        {children}
      </div>
    );
  }
);

InputBase.displayName = COMPONENT_NAME;
