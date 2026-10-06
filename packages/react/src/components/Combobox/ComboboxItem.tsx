'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { ComboboxItemProps } from './ComboboxItem.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ComboboxItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ComboboxItem = ({
  className,
  children,
  flex,
  flexBasis,
  flexShrink,
  flexGrow,
  alignItems,
  justifyContent,
  gap,
  ...props
}: ComboboxItemProps) => {
  const contentStyles = { flex, flexBasis, flexShrink, flexGrow, alignItems, justifyContent, gap };
  return (
    <ComboboxPrimitive.Item className={cn(componentClassName, className)} {...props}>
      <Flex width="100%" {...contentStyles}>
        {children}
      </Flex>
      <ComboboxPrimitive.ItemIndicator className={`${componentClassName}Indicator`}>
        <TickSmallIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
};

ComboboxItem.displayName = COMPONENT_NAME;
