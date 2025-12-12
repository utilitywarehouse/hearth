'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive, ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import type { MenuContentProps } from './MenuContent.props';

const COMPONENT_NAME = 'MenuContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuContent = ({
  className,
  children,
  forceMount,
  placement = 'bottomLeft',
  ...props
}: MenuContentProps) => {
  const portalProps = { forceMount };
  const placementTranslation: {
    [key: string]: { side: 'bottom' | 'top'; align: 'start' | 'end' };
  } = {
    bottomLeft: { side: 'bottom', align: 'start' },
    bottomRight: { side: 'bottom', align: 'end' },
    topLeft: { side: 'top', align: 'start' },
    topRight: { side: 'top', align: 'end' },
  };

  return (
    <MenuPrimitive.DropdownMenuPortal {...portalProps}>
      <MenuPrimitive.DropdownMenuContent
        className={clsx(componentClassName, className)}
        {...props}
        sideOffset={4}
        {...placementTranslation[placement]}
        collisionPadding={8}
        // This is a temporary UI fix, until we have time to replace with Base UI.
        onCloseAutoFocus={e => e.preventDefault()}
      >
        <ScrollAreaPrimitive.Root className="hearth-ScrollAreaRoot" type="auto">
          <ScrollAreaPrimitive.Viewport className="hearth-ScrollAreaViewport">
            <div className={`${componentClassName}List`}>{children}</div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            className="hearth-ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollAreaPrimitive.Thumb className="hearth-ScrollAreaThumb" />
          </ScrollAreaPrimitive.Scrollbar>
        </ScrollAreaPrimitive.Root>
      </MenuPrimitive.DropdownMenuContent>
    </MenuPrimitive.DropdownMenuPortal>
  );
};

MenuContent.displayName = COMPONENT_NAME;
