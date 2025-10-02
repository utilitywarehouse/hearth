import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { SelectItemProps } from './SelectItem.props';
import { Select as RadixSelect } from 'radix-ui';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'SelectItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectItemElement = ElementRef<'div'>;

export const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixSelect.Item className={clsx(componentClassName, className)} ref={ref} {...props}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className={`${componentClassName}Indicator`}>
          <TickSmallIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = COMPONENT_NAME;
