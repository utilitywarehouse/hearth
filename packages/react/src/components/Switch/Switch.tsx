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
import { forwardRef } from 'react';
import type { ComponentRef, MouseEvent } from 'react';

const COMPONENT_NAME = 'Switch';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SwitchElement = ComponentRef<'button'>;

/**
 * Use Switch to let users toggle a single setting on or off immediately,
 * such as activating or deactivating a feature. For choosing between more
 * than two related options, use ToggleGroup or SegmentedControl instead.
 * Always provide a `label`, or otherwise label the component for screen
 * reader users if the visible `label` prop isn't used.
 *
 * @summary A toggle control for switching a single setting on or off.
 */
export const Switch = forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const {
    className,
    label,
    id: providedId,
    'aria-labelledby': ariaLabelledby,
    disabled,
    onCheckedChange,
    onClick,
    ...switchProps
  } = extractProps(props, switchPropDefs, marginPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'switch' });
  const showLabel = !!label;

  // We're using aria-disabled rather than disabled, so that the element can
  // still be focused with a keyboard. Radix skips toggling when the click is
  // default-prevented, which keeps a disabled Switch from changing state.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <div
      aria-disabled={disabled || undefined}
      className={componentClassName}
      data-testid={componentClassName}
    >
      {showLabel ? (
        <BodyText as="label" size="lg" id={labelId} htmlFor={id}>
          {label}
        </BodyText>
      ) : null}
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(`${componentClassName}Root`, className)}
        id={id}
        aria-labelledby={ariaLabelledby ?? (showLabel ? labelId : undefined)}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        onClick={handleClick}
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
