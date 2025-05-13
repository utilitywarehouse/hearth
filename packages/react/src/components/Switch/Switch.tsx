import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import { switchPropDefs, SwitchProps } from './Switch.props';
import { Root as RadixSwitchRoot, Thumb as RadixSwitchThumb } from '@radix-ui/react-switch';
import clsx from 'clsx';
import { extractProps } from '../../helpers/extract-props';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const componentName = 'Switch';
const componentClassName = withGlobalPrefix(componentName);

type SwitchElement = ElementRef<'button'>;

export const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const { className, ...switchProps } = extractProps(props, switchPropDefs);
  return (
    <RadixSwitchRoot ref={ref} className={clsx(componentClassName, className)} {...switchProps}>
      <RadixSwitchThumb className="hearth-SwitchThumb">
        <CloseSmallIcon className="hearth-CloseIcon" />
        <TickSmallIcon className="hearth-TickIcon" />
      </RadixSwitchThumb>
    </RadixSwitchRoot>
  );
});

Switch.displayName = componentName;
