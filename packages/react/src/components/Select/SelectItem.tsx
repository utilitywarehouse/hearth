'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Select as SelectPrimitive } from 'radix-ui';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { SelectItemProps } from './Select.props';

const COMPONENT_NAME = 'SelectItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const SelectItem = ({ className, children, ...props }: SelectItemProps) => {
  return (
    <SelectPrimitive.Item className={clsx(componentClassName, className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={`${componentClassName}Indicator`}>
        <TickSmallIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

SelectItem.displayName = COMPONENT_NAME;
