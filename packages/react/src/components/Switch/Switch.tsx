import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
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

export const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const {
    className,
    label,
    id: providedId,
    'aria-labelledby': ariaLabelledby,
    ...switchProps
  } = extractProps(props, switchPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'switch' });
  const showLabel = !!label;
  return (
    <div className={componentClassName}>
      {showLabel ? (
        <BodyText as="label" size="lg" id={labelId} htmlFor={id}>
          {label}
        </BodyText>
      ) : null}
      <RadixSwitchRoot
        ref={ref}
        className={clsx('hearth-SwitchRoot', className)}
        id={id}
        aria-labelledby={ariaLabelledby || showLabel ? labelId : undefined}
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
