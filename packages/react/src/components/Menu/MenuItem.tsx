'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import type { MenuItemProps } from './MenuItem.props';

const COMPONENT_NAME = 'MenuItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
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
