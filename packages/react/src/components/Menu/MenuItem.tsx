'use client';

import { forwardRef, isValidElement } from 'react';
import type { ComponentRef, ReactElement } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Menu as MenuPrimitive } from '@base-ui/react';
import type { MenuItemProps } from './MenuItem.props';
import { warn } from '../../helpers/logger';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuItemElement = ComponentRef<'div'>;

export const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
  (
    {
      className,
      colorScheme = 'functional',
      asChild,
      children,
      onClick,
      label,
      onSelect,
      textValue,
      ...props
    },
    ref
  ) => {
    warn(onSelect !== undefined, 'MenuItem: `onSelect` is deprecated. Use `onClick` instead.');
    warn(textValue !== undefined, 'MenuItem: `textValue` is deprecated. Use `label` instead.');

    const resolvedlabel = label ?? textValue;

    const handleClick =
      onSelect !== undefined
        ? (event: Parameters<NonNullable<typeof onClick>>[0]) => {
            onSelect(event);
            onClick?.(event);
          }
        : onClick;

    const isElementChild = asChild && isValidElement(children);
    warn(
      asChild === true && !isValidElement(children),
      'MenuItem: `asChild` requires a single React element as children. Falling back to normal rendering.'
    );

    return (
      <MenuPrimitive.Item
        ref={ref}
        className={cn(componentClassName, className)}
        data-colorscheme={colorScheme}
        render={isElementChild ? (children as ReactElement) : undefined}
        onClick={handleClick}
        label={resolvedlabel}
        {...props}
      >
        {isElementChild ? undefined : children}
      </MenuPrimitive.Item>
    );
  }
);

MenuItem.displayName = COMPONENT_NAME;
