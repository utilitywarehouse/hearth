'use client';

import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToggleGroupProps } from './ToggleGroup.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ToggleGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToggleGroup = ({
  className,
  ref,
  type = 'multiple',
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: ToggleGroupProps) => {
  const toggleGroupProps = {
    type,
    value,
    defaultValue,
    onValueChange,
    children,
    ref,
  };

  return (
    <Flex asChild {...props}>
      <ToggleGroupPrimitive.Root
        className={clsx(componentClassName, className)}
        {...(toggleGroupProps as React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>)}
      />
    </Flex>
  );
};

ToggleGroup.displayName = COMPONENT_NAME;
