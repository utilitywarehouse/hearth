'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Menu as MenuPrimitive } from '@base-ui/react';
import type { MenuTriggerProps } from './MenuTrigger.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'MenuTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuTriggerElement = ComponentRef<'button'>;

export const MenuTrigger = forwardRef<MenuTriggerElement, MenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuPrimitive.Trigger
        ref={ref}
        className={cn(componentClassName, className)}
        render={children}
        {...props}
      />
    );
  }
);

MenuTrigger.displayName = COMPONENT_NAME;
