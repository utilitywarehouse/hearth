'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Menu as MenuPrimitive, ScrollArea as ScrollAreaPrimitive } from '@base-ui/react';
import type { MenuContentProps } from './MenuContent.props';
import { warn } from '../../helpers/logger';
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
    warn(
      forceMount !== undefined,
      'MenuContent: `forceMount` is deprecated. Use `keepMounted` instead.'
    );
    const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);

    return (
      <MenuPrimitive.Portal keepMounted={resolvedKeepMounted}>
        <MenuPrimitive.Positioner
          {...placementTranslation[placement]}
          sideOffset={4}
          collisionPadding={8}
        >
          <MenuPrimitive.Popup ref={ref} className={cn(componentClassName, className)} {...props}>
            <ScrollAreaPrimitive.Root className={withGlobalPrefix('ScrollAreaRoot')}>
              <ScrollAreaPrimitive.Viewport className={withGlobalPrefix('ScrollAreaViewport')}>
                <ScrollAreaPrimitive.Content className={`${componentClassName}List`}>
                  {children}
                </ScrollAreaPrimitive.Content>
              </ScrollAreaPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className={withGlobalPrefix('ScrollAreaScrollbar')}
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className={withGlobalPrefix('ScrollAreaThumb')} />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    );
  }
);

MenuContent.displayName = COMPONENT_NAME;
