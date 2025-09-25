import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import { switchPropDefs, SwitchProps } from './Switch.props';
import clsx from 'clsx';
import { Switch as RadixSwitch } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { useIds } from '../../hooks/use-ids';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Switch';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SwitchElement = ElementRef<'button'>;

export const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
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
  const defaultRef = React.useRef<HTMLButtonElement | null>(null);
  const switchRef = forwardedRef || defaultRef;

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
      <RadixSwitch.Root
        ref={switchRef}
        className={clsx('hearth-SwitchRoot', className)}
        id={id}
        aria-labelledby={ariaLabelledby ?? (showLabel ? labelId : undefined)}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        onCheckedChange={disabled ? undefined : onCheckedChange}
        {...switchProps}
      >
        <RadixSwitch.Thumb className="hearth-SwitchThumb">
          <CloseSmallIcon className="hearth-CloseIcon" />
          <TickSmallIcon className="hearth-TickIcon" />
        </RadixSwitch.Thumb>
      </RadixSwitch.Root>
    </div>
  );
});

Switch.displayName = COMPONENT_NAME;
