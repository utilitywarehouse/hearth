'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import type { MenuTriggerProps } from './MenuTrigger.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'MenuTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuTriggerElement = ComponentRef<'button'>;

export const MenuTrigger = React.forwardRef<MenuTriggerElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <MenuPrimitive.DropdownMenuTrigger
        ref={ref}
        className={cn(componentClassName, className)}
        asChild
        {...props}
      />
    );
  }
);

MenuTrigger.displayName = COMPONENT_NAME;
