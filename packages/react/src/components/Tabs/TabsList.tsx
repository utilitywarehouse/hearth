import * as React from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabsListProps } from './TabsList.props';
import { ChevronLeftSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';

const COMPONENT_NAME = 'TabsList';
const listClassName = withGlobalPrefix(COMPONENT_NAME);

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...rest }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeTrigger = container.querySelector<HTMLElement>('.hearth-Tab[data-state="active"]');
    if (!activeTrigger) return;

    setIndicatorX(activeTrigger.offsetLeft);
    setIndicatorWidth(activeTrigger.offsetWidth);
  }, []);

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const overflow = el.scrollWidth > el.clientWidth + 1;
    const canLeft = overflow && el.scrollLeft > 0;
    const canRight = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    setCanScrollLeft(canLeft);
    setCanScrollRight(canRight);
  }, []);

  useLayoutEffect(() => {
    updateIndicator();
    checkOverflow();

    const container = containerRef.current;
    const scrollEl = scrollRef.current;
    if (!container && !scrollEl) return;

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
      checkOverflow();
    });

    if (container) resizeObserver.observe(container);
    if (scrollEl) resizeObserver.observe(scrollEl);

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

    const onScroll = () => checkOverflow();
    scrollEl?.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      scrollEl?.removeEventListener('scroll', onScroll);
    };
  }, [updateIndicator, checkOverflow]);

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
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const container = containerRef.current;
    if (!container) return;

    const triggers = Array.from(
      container.querySelectorAll<HTMLElement>('.hearth-Tab:not([data-disabled])')
    );
    if (triggers.length === 0) return;

    const activeElement = document.activeElement as HTMLElement | null;
    let currentIndex = triggers.findIndex(
      el => el === activeElement || (activeElement ? el.contains(activeElement) : false)
    );

    if (currentIndex === -1) currentIndex = event.shiftKey ? 0 : -1;

    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + triggers.length) % triggers.length
      : (currentIndex + 1) % triggers.length;

    event.preventDefault();
    const nextEl = triggers[nextIndex];
    nextEl?.focus();
    nextEl?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, []);

  return (
    <RadixTabs.List className={clsx(listClassName, className)} onKeyDown={handleKeyDown} {...rest}>
      {canScrollLeft ? (
        <div className="hearth-scroll-button left" aria-hidden>
          <UnstyledIconButton label="scroll left" tabIndex={-1} onClick={handleScrollLeft}>
            <ChevronLeftSmallIcon />
          </UnstyledIconButton>
        </div>
      ) : null}
      <div className="hearth-scroll" ref={scrollRef}>
        <div className="hearth-container" ref={containerRef}>
          {children}
          <div
            className="hearth-TabsIndicator"
            style={{ transform: `translateX(${indicatorX}px)`, width: `${indicatorWidth}px` }}
          />
        </div>
      </div>
      {canScrollRight ? (
        <div className="hearth-scroll-button right" aria-hidden>
          <UnstyledIconButton label="scroll right" tabIndex={-1} onClick={handleScrollRight}>
            <ChevronRightSmallIcon />
          </UnstyledIconButton>
        </div>
      ) : null}
    </RadixTabs.List>
  );
};

TabsList.displayName = COMPONENT_NAME;
