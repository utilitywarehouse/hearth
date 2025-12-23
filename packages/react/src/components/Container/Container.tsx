'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ContainerProps } from './Container.props';
import { Flex } from '../Flex/Flex';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'Container';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Container = ({
  className,
  spacing,
  direction,
  alignItems,
  alignContent,
  justifyContent,
  wrap,
  gap,
  maxWidth,
  children,
  align = 'center',
  asChild,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingX,
  paddingY,
  ...props
}: ContainerProps) => {
  const innerProps = {
    spacing,
    direction,
    alignItems,
    alignContent,
    justifyContent,
    wrap,
    gap,
    maxWidth,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingX,
    paddingY,
  };
  const Component = asChild ? Slot.Root : 'div';

  return (
    <Flex className={cn(componentClassName, className)} {...props} justifyContent={align} asChild>
      <Component>
        {getSubtree({ asChild, children }, children => (
          <Flex className={`${componentClassName}Inner`} {...innerProps}>
            {children}
          </Flex>
        ))}
      </Component>
    </Flex>
  );
};

Container.displayName = COMPONENT_NAME;
