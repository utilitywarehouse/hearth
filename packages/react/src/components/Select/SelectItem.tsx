'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Select as SelectPrimitive } from 'radix-ui';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { SelectItemProps } from './Select.props';

const COMPONENT_NAME = 'SelectItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectItemElement = ComponentRef<'div'>;

export const SelectItem = forwardRef<SelectItemElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <SelectPrimitive.Item ref={ref} className={cn(componentClassName, className)} {...props}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className={`${componentClassName}Indicator`}>
          <TickSmallIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = COMPONENT_NAME;
