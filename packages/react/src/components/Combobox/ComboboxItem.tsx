'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Combobox as ComboboxPrimitive } from '@base-ui-components/react/combobox';
import { ComboboxItemProps } from './ComboboxItem.props';

const COMPONENT_NAME = 'ComboboxItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ComboboxItem = ({ className, children, ...props }: ComboboxItemProps) => {
  return (
    <ComboboxPrimitive.Item className={cn(componentClassName, className)} {...props}>
      <div>{children}</div>
      <ComboboxPrimitive.ItemIndicator className={`${componentClassName}Indicator`}>
        <TickSmallIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
};

ComboboxItem.displayName = COMPONENT_NAME;
