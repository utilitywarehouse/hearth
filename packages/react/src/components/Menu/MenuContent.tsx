'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DropdownMenu as MenuPrimitive, ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import type { MenuContentProps } from './MenuContent.props';
import { forwardRef, useCallback, useRef } from 'react';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';
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
  ({ className, children, forceMount, placement = 'bottomLeft', ...props }, ref) => {
    const nodeRef = useRef<MenuContentElement | null>(null);
    const cleanupRef = useRef<(() => void) | undefined>(undefined);

    // There are times the content needs to be hidden but present in the DOM,
    // for SEO reasons. So we use forceMount.
    //
    // A callback ref is used instead of useLayoutEffect + useRef because
    // portal children's refs are not reliably attached by the time
    // useLayoutEffect fires in the parent. The callback fires exactly when the
    // DOM node is created or removed.
    const contentRef = useCallback(
      (node: MenuContentElement | null) => {
        nodeRef.current = node;
        cleanupRef.current?.();
        cleanupRef.current = undefined;

        if (!node || !forceMount) return;

        node.hidden = node.dataset.state !== 'open';

        const observer = new MutationObserver(() => {
          node.hidden = node.dataset.state !== 'open';
        });
        observer.observe(node, { attributes: true, attributeFilter: ['data-state'] });

        cleanupRef.current = () => {
          observer.disconnect();
          node.hidden = false;
        };
      },
      [forceMount]
    );

    const mergedRef = useMergedRefs(contentRef, ref);

    return (
      <MenuPrimitive.DropdownMenuPortal forceMount={forceMount}>
        <MenuPrimitive.DropdownMenuContent
          ref={mergedRef}
          forceMount={forceMount}
          className={cn(componentClassName, className)}
          {...props}
          sideOffset={4}
          {...placementTranslation[placement]}
          collisionPadding={8}
          // These are temporary UI fixes, until we have time to replace with Base UI.
          onCloseAutoFocus={e => e.preventDefault()}
          onInteractOutside={
            forceMount
              ? e => {
                  // With forceMount, Radix's DismissableLayer is always mounted and fires
                  // on every outside interaction — including trigger clicks. React processes
                  // pointer events with flushSync, so by the time the DismissableLayer's
                  // document listener fires (added via setTimeout after mount), React has
                  // already committed the new open state. Checking data-state here would
                  // always see 'open' and fail to prevent. Instead we check the click target:
                  // if it's inside the trigger (found via aria-labelledby → trigger id),
                  // we prevent the dismiss so the trigger's own toggle handler takes effect.
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  const originalEvent = (e as CustomEvent).detail?.originalEvent as
                    | PointerEvent
                    | undefined;
                  const target = originalEvent?.target as HTMLElement | null;
                  const triggerId = nodeRef.current?.getAttribute('aria-labelledby');
                  const triggerEl = triggerId ? document.getElementById(triggerId) : null;
                  if (triggerEl?.contains(target)) e.preventDefault();
                }
              : undefined
          }
        >
          <ScrollAreaPrimitive.Root className={withGlobalPrefix('ScrollAreaRoot')} type="auto">
            <ScrollAreaPrimitive.Viewport className={withGlobalPrefix('ScrollAreaViewport')}>
              <div className={`${componentClassName}List`}>{children}</div>
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
              className={withGlobalPrefix('ScrollAreaScrollbar')}
              orientation="vertical"
            >
              <ScrollAreaPrimitive.Thumb className={withGlobalPrefix('ScrollAreaThumb')} />
            </ScrollAreaPrimitive.Scrollbar>
          </ScrollAreaPrimitive.Root>
        </MenuPrimitive.DropdownMenuContent>
      </MenuPrimitive.DropdownMenuPortal>
    );
  }
);

MenuContent.displayName = COMPONENT_NAME;
