'use client';

import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ContainerProps } from './Container.props';
import { Flex } from '../Flex/Flex';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'Container';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ContainerElement = ElementRef<'div'>;

export const Container = React.forwardRef<ContainerElement, ContainerProps>(
  (
    {
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
      paddingInline,
      paddingBlock,
      ...props
    },
    ref
  ) => {
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
      paddingInline,
      paddingBlock,
    };
    const Component = asChild ? Slot.Root : 'div';

    return (
      <Flex
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
        justifyContent={align}
        asChild
      >
        <Component>
          {getSubtree({ asChild, children }, children => (
            <Flex className={`${componentClassName}Inner`} {...innerProps}>
              {children}
            </Flex>
          ))}
        </Component>
      </Flex>
    );
  }
);

Container.displayName = COMPONENT_NAME;
