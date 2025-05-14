import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React, { useImperativeHandle } from 'react';
import { switchPropDefs, SwitchProps } from './Switch.props';
import { Root as RadixSwitchRoot, Thumb as RadixSwitchThumb } from '@radix-ui/react-switch';
import clsx from 'clsx';
import { extractProps } from '../../helpers/extract-props';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { useIds } from '../../hooks/use-ids';

const componentName = 'Switch';
const componentClassName = withGlobalPrefix(componentName);

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
  } = extractProps(props, switchPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'switch' });
  const showLabel = !!label;
  const defaultRef = React.useRef<HTMLButtonElement | null>(null);
  const switchRef = forwardedRef || defaultRef;

  // We're using aria-disabled rather than disabled, so that the element can
  // still be focused with a keyboard. Therefore we need to prevent the
  // internal button from being clickable when the component is disabled.
  React.useEffect(() => {
    if (switchRef && typeof switchRef === 'object' && switchRef.current) {
      if (Boolean(disabled)) {
        switchRef.current.addEventListener('click', e => {
          e.preventDefault();
        });
      }
    }
  }, [switchRef, disabled]);

  return (
    <div aria-disabled={disabled || undefined} className={componentClassName}>
      {showLabel ? (
        <BodyText as="label" size="lg" id={labelId} htmlFor={id}>
          {label}
        </BodyText>
      ) : null}
      <RadixSwitchRoot
        ref={switchRef}
        className={clsx('hearth-SwitchRoot', className)}
        id={id}
        aria-labelledby={ariaLabelledby ?? (showLabel ? labelId : undefined)}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        onCheckedChange={disabled ? undefined : onCheckedChange}
        {...switchProps}
      >
        <RadixSwitchThumb className="hearth-SwitchThumb">
          <CloseSmallIcon className="hearth-CloseIcon" />
          <TickSmallIcon className="hearth-TickIcon" />
        </RadixSwitchThumb>
      </RadixSwitchRoot>
    </div>
  );
});

Switch.displayName = componentName;
