'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Menu as MenuPrimitive } from '@base-ui/react';
import type { MenuItemProps } from './MenuItem.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuItemElement = ComponentRef<'div'>;

export const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
  ({ className, colorScheme = 'functional', ...props }, ref) => {
    return (
      <MenuPrimitive.Item
        ref={ref}
        className={cn(componentClassName, className)}
        data-colorscheme={colorScheme}
        {...props}
      />
    );
  }
);

MenuItem.displayName = COMPONENT_NAME;
