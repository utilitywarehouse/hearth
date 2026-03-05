'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { switchPropDefs } from './Switch.props';
import type { SwitchProps } from './Switch.props';
import { cn } from '../../helpers/cn';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { useIds } from '../../hooks/use-ids';
import { marginPropDefs } from '../../props/margin.props';
import * as React from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'Switch';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SwitchElement = ComponentRef<'button'>;

export const Switch = React.forwardRef<SwitchElement, SwitchProps>(({ ...props }, forwardedRef) => {
  const {
    className,
    label,
    id: providedId,
    'aria-labelledby': ariaLabelledby,
    disabled,
    onCheckedChange,
    ...switchProps
  } = extractProps(props, switchPropDefs, marginPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'switch' });
  const showLabel = !!label;
  const internalRef = React.useRef<HTMLButtonElement | null>(null);
  const switchRef = forwardedRef || internalRef;

  // We're using aria-disabled rather than disabled, so that the element can
  // still be focused with a keyboard. Therefore we need to prevent the
  // internal button from being clickable when the component is disabled.
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Get the ref value and ensure proper typing
    let currentElement: HTMLButtonElement | null = null;
    if (switchRef && typeof switchRef === 'object' && switchRef.current) {
      // Type assertion to ensure TypeScript understands this is a valid ref object
      const refObject = switchRef as React.RefObject<HTMLButtonElement>;
      currentElement = refObject.current;
    }

    if (currentElement && disabled) {
      currentElement.addEventListener('click', handleClick);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener('click', handleClick);
      }
    };
  }, [switchRef, disabled]);

  return (
    <div aria-disabled={disabled || undefined} className={componentClassName}>
      {showLabel ? (
        <BodyText as="label" size="lg" id={labelId} htmlFor={id}>
          {label}
        </BodyText>
      ) : null}
      <SwitchPrimitive.Root
        ref={switchRef}
        className={cn(`${componentClassName}Root`, className)}
        id={id}
        aria-labelledby={ariaLabelledby ?? (showLabel ? labelId : undefined)}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        onCheckedChange={disabled ? undefined : onCheckedChange}
        {...switchProps}
      >
        <SwitchPrimitive.Thumb className={`${componentClassName}Thumb`}>
          <CloseSmallIcon className={`${componentClassName}CloseIcon`} />
          <TickSmallIcon className={`${componentClassName}TickIcon`} />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    </div>
  );
});

Switch.displayName = COMPONENT_NAME;
