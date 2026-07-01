'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Menu as MenuPrimitive } from '@base-ui/react';
import type { MenuContentProps } from './MenuContent.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'MenuContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type MenuContentElement = ComponentRef<'div'>;

const placementTranslation: Record<string, { side: 'bottom' | 'top'; align: 'start' | 'end' }> = {
  bottomLeft: { side: 'bottom', align: 'start' },
  bottomRight: { side: 'bottom', align: 'end' },
  topLeft: { side: 'top', align: 'start' },
  topRight: { side: 'top', align: 'end' },
};

export const MenuContent = forwardRef<MenuContentElement, MenuContentProps>(
  ({ className, children, forceMount, keepMounted, placement = 'bottomLeft', ...props }, ref) => {
    if (process.env.NODE_ENV !== 'production' && forceMount !== undefined) {
      console.warn('[Hearth] MenuContent: `forceMount` is deprecated. Use `keepMounted` instead.');
    }
    const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);

    return (
      <MenuPrimitive.Portal keepMounted={resolvedKeepMounted}>
        <MenuPrimitive.Positioner
          {...placementTranslation[placement]}
          sideOffset={4}
          collisionPadding={8}
        >
          <MenuPrimitive.Popup ref={ref} className={cn(componentClassName, className)} {...props}>
            <MenuPrimitive.Viewport className={`${componentClassName}List`}>
              {children}
            </MenuPrimitive.Viewport>
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    );
  }
);

MenuContent.displayName = COMPONENT_NAME;
