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

/**
 * Use MenuItem to render a single selectable action or option inside a
 * `Menu`'s `MenuContent`. Set `asChild` to render it as a different element,
 * such as a link.
 *
 * @summary A selectable action or option within a Menu.
 */
export const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
  (
    { className, colorScheme = 'functional', asChild, children, ...props },
    ref
  ) => {
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
        {...props}
      >
        {isElementChild ? undefined : children}
      </MenuPrimitive.Item>
    );
  }
);

MenuItem.displayName = COMPONENT_NAME;
