'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import type { MenuItemProps } from './MenuItem.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuItemElement = ComponentRef<'div'>;

export const MenuItem = React.forwardRef<MenuItemElement, MenuItemProps>(
  ({ className, colorScheme = 'functional', ...props }, ref) => {
    return (
      <MenuPrimitive.DropdownMenuItem
        ref={ref}
        className={cn(componentClassName, className)}
        data-colorscheme={colorScheme}
        {...props}
      />
    );
  }
);

MenuItem.displayName = COMPONENT_NAME;
