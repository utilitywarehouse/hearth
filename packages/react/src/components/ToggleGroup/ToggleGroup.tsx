'use client';

import * as React from 'react';
import type { ComponentRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToggleGroupProps } from './ToggleGroup.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ToggleGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleGroupElement = ComponentRef<'div'>;

export const ToggleGroup = React.forwardRef<ToggleGroupElement, ToggleGroupProps>(
  (
    { className, type = 'multiple', value, defaultValue, onValueChange, children, ...props },
    ref
  ) => {
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
          className={cn(componentClassName, className)}
          {...(toggleGroupProps as React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>)}
        />
      </Flex>
    );
  }
);

ToggleGroup.displayName = COMPONENT_NAME;
