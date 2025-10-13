import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as RadixMenu, ScrollArea as RadixScrollArea } from 'radix-ui';
import { MenuContentProps } from './MenuContent.props';

const COMPONENT_NAME = 'MenuContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const MenuContent: React.FC<MenuContentProps> = ({
  className,
  children,
  forceMount,
  placement = 'bottomLeft',
  ...props
}) => {
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
    <RadixMenu.DropdownMenuPortal {...portalProps}>
      <RadixMenu.DropdownMenuContent
        className={clsx(componentClassName, className)}
        {...props}
        sideOffset={4}
        {...placementTranslation[placement]}
        collisionPadding={8}
      >
        <RadixScrollArea.Root className="hearth-ScrollAreaRoot" type="auto">
          <RadixScrollArea.Viewport className="hearth-ScrollAreaViewport">
            {children}
          </RadixScrollArea.Viewport>
          <RadixScrollArea.Scrollbar className="hearth-ScrollAreaScrollbar" orientation="vertical">
            <RadixScrollArea.Thumb className="hearth-ScrollAreaThumb" />
          </RadixScrollArea.Scrollbar>
        </RadixScrollArea.Root>
      </RadixMenu.DropdownMenuContent>
    </RadixMenu.DropdownMenuPortal>
  );
};

MenuContent.displayName = COMPONENT_NAME;
