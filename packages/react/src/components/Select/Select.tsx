import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SelectProps } from './Select.props';
import { Select as RadixSelect } from 'radix-ui';
import {
  ExpandSmallIcon,
  ChevronUpSmallIcon,
  ChevronDownSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ElementRef<'button'>;

export const Select = React.forwardRef<SelectElement, SelectProps>((props, ref) => {
  const { className, children, ...selectProps } = extractProps(props, marginPropDefs);
  return (
    <div className={clsx(componentClassName, className)}>
      <RadixSelect.Root {...selectProps}>
        <RadixSelect.Trigger ref={ref} className={`${componentClassName}Trigger`}>
          <RadixSelect.Value />
          <RadixSelect.Icon className={`${componentClassName}TriggerIcon`}>
            <ExpandSmallIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={`${componentClassName}Dropdown`}
            position="popper"
            side="bottom"
            sideOffset={4}
          >
            <RadixSelect.ScrollUpButton>
              <ChevronUpSmallIcon />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton>
              <ChevronDownSmallIcon />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
});

Select.displayName = COMPONENT_NAME;
