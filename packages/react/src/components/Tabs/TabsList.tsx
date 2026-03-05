'use client';

import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronLeftSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { TabsListProps } from './Tabs.props';

const COMPONENT_NAME = 'TabsList';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TabsListElement = ComponentRef<'div'>;

export const TabsList = forwardRef<TabsListElement, TabsListProps>(
  ({ className, children, ...rest }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Underline indicator that animates to match the active tab trigger
    const [activeTabIndicatorX, setActiveTabIndicatorX] = useState(0);
    const [activeTabIndicatorWidth, setActiveTabIndicatorWidth] = useState(0);

    // Whether horizontal scroll icons should be shown
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Sync indicator position/size to the current active tab trigger
    const updateIndicator = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const activeTrigger = container.querySelector<HTMLElement>(
        '.' + withGlobalPrefix('Tab[data-state="active"]')
      );
      if (!activeTrigger) return;

      setActiveTabIndicatorX(activeTrigger.offsetLeft);
      setActiveTabIndicatorWidth(activeTrigger.offsetWidth);
    }, []);

    // Compute overflow and whether we can scroll left/right to show scroll icons
    const checkOverflow = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;

      const overflow = el.scrollWidth > el.clientWidth + 1;
      const canLeft = overflow && el.scrollLeft > 0;
      const canRight = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

      setCanScrollLeft(canLeft);
      setCanScrollRight(canRight);
    }, []);

    // Keep indicator and scroll buttons in sync with DOM/layout changes
    useLayoutEffect(() => {
      updateIndicator();
      checkOverflow();

      const container = containerRef.current;
      const scrollEl = scrollRef.current;
      if (!container && !scrollEl) return;

      // Watch size changes (container and scroll viewport)
      const resizeObserver = new ResizeObserver(() => {
        updateIndicator();
        checkOverflow();
      });

      if (container) resizeObserver.observe(container);
      if (scrollEl) resizeObserver.observe(scrollEl);

      // Watch DOM mutations that can affect which tab is active or present
      const mutationObserver = new MutationObserver(() => {
        updateIndicator();
        checkOverflow();
      });

      if (container) {
        mutationObserver.observe(container, {
          subtree: true,
          attributes: true,
          attributeFilter: ['data-state'],
          childList: true,
        });
      }

      // Update scroll icons as the user scrolls
      const onScroll = () => checkOverflow();
      scrollEl?.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
        scrollEl?.removeEventListener('scroll', onScroll);
      };
    }, [updateIndicator, checkOverflow]);

    // Smoothly scroll the tab section by ~60% of the viewport width
    const scrollBy = useCallback((direction: 1 | -1) => {
      const el = scrollRef.current;
      if (!el) return;

      const step = el.clientWidth * 0.6;
      const target = Math.max(
        0,
        Math.min(el.scrollLeft + direction * step, el.scrollWidth - el.clientWidth)
      );
      el.scrollTo({ left: target, behavior: 'smooth' });
    }, []);

    const handleScrollLeft = useCallback(() => scrollBy(-1), [scrollBy]);
    const handleScrollRight = useCallback(() => scrollBy(1), [scrollBy]);

    return (
      <TabsPrimitive.List ref={ref} className={cn(componentClassName, className)} {...rest}>
        {canScrollLeft ? (
          <div className={`${componentClassName}ScrollButtonLeft`} aria-hidden>
            <UnstyledIconButton label="scroll left" tabIndex={-1} onClick={handleScrollLeft}>
              <ChevronLeftSmallIcon />
            </UnstyledIconButton>
          </div>
        ) : null}
        <div
          className={cn(`${componentClassName}Scroll`)}
          data-scroll-left={canScrollLeft ? '' : undefined}
          data-scroll-right={canScrollRight ? '' : undefined}
          ref={scrollRef}
        >
          <div className={`${componentClassName}Container`} ref={containerRef}>
            {children}
            <div
              className={`${componentClassName}Indicator`}
              // Animated underline: position and width driven by active trigger
              style={{
                transform: `translateX(${activeTabIndicatorX}px)`,
                width: `${activeTabIndicatorWidth}px`,
              }}
            />
          </div>
        </div>
        {canScrollRight ? (
          <div className={`${componentClassName}ScrollButtonRight`} aria-hidden>
            <UnstyledIconButton label="scroll right" tabIndex={-1} onClick={handleScrollRight}>
              <ChevronRightSmallIcon />
            </UnstyledIconButton>
          </div>
        ) : null}
      </TabsPrimitive.List>
    );
  }
);

TabsList.displayName = COMPONENT_NAME;
