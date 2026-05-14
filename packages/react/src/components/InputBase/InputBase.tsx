'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { cn } from '../../helpers/cn';
import { forwardRef, useRef, type ComponentRef } from 'react';
import type { InputBaseProps } from './InputBase.props';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'InputBase';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export type InputBaseElement = ComponentRef<'input'>;

export const InputBase = forwardRef<InputBaseElement, InputBaseProps>(
  ({ className, children, disabled, readOnly, required, placeholder, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLInputElement>(null);
    // merge refs so we can control focus but still allow parent components to
    // have a ref to the input
    const ref = useMergedRefs(forwardedRef, localRef);
    return (
      <div
        className={cn(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        data-testid={componentClassName}
        onPointerDown={event => {
          // avoid losing focus when users click on non-interactive slot elements, such as icons
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          if (localRef && typeof localRef === 'object' && localRef.current) {
            const input = localRef.current;
            requestAnimationFrame(() => {
              input.focus();
            });
          }
        }}
      >
        <input
          ref={ref}
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
