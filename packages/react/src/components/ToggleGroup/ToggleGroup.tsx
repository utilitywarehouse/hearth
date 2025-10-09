import * as React from 'react';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ToggleGroupProps } from './ToggleGroup.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ToggleGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleGroupElement = ElementRef<'div'>;

export const ToggleGroup = React.forwardRef<ToggleGroupElement, ToggleGroupProps>(
  (
    {
      className,
      direction,
      type = 'multiple',
      value,
      defaultValue,
      onValueChange,
      children,
      ...flexProps
    },
    ref
  ) => {
    const toggleGroupProps = {
      type,
      value,
      defaultValue,
      onValueChange,
      children,
    };

    return (
      <Flex asChild {...flexProps}>
        <RadixToggleGroup.Root
          ref={ref}
          className={clsx(componentClassName, className)}
          {...(toggleGroupProps as React.ComponentProps<typeof RadixToggleGroup.Root>)}
          orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        />
      </Flex>
    );
  }
);

ToggleGroup.displayName = COMPONENT_NAME;
