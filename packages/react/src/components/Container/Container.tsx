'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ContainerProps } from './Container.props';
import { Flex } from '../Flex/Flex';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'Container';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ContainerElement = ComponentRef<'div'>;

/**
 * Use Container to constrain and center page content, with a max-width that
 * follows the container width design token above the desktop breakpoint and
 * spans 100% below it, plus optional responsive padding and gutters via the
 * `spacing` prop.
 * For primitive styling with no built-in max-width or spacing, use Box instead.
 * For grid layouts, use Grid instead. For general flexbox-based layouts without
 * the max-width/centering behaviour, use Flex instead.
 *
 * @summary A centered, max-width-constrained wrapper for page content.
 */
export const Container = forwardRef<ContainerElement, ContainerProps>(
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
      paddingX,
      paddingY,
      ...props
    }: ContainerProps,
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
      paddingX,
      paddingY,
    };
    const Component = asChild ? Slot.Root : 'div';

    return (
      <Flex
        ref={ref}
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
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
