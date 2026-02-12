'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { cn } from '../../helpers/cn';
import React, { type ComponentRef } from 'react';
import type { InputBaseProps } from './InputBase.props';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'InputBase';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export type InputBaseElement = ComponentRef<'input'>;

// We're keeping the forwardRef API here for backwards compatibility with consumers using Combobox in React 18 applications
// https://linear.app/utilitywarehouse/issue/UWDS-4232/broken-combobox
export const InputBase = React.forwardRef<InputBaseElement, InputBaseProps>(
  ({ className, children, disabled, readOnly, required, placeholder, ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    // merge refs so we can control focus but still allow parent components to
    // have a ref to the input
    const inputRef = useMergedRefs(forwardedRef, internalRef);
    return (
      <div
        className={cn(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        onPointerDown={event => {
          // avoid losing focus when users click on non-interactive slot elements, such as icons
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          if (internalRef && typeof internalRef === 'object' && internalRef.current) {
            const input = internalRef.current;
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
