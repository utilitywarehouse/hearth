'use client';

import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { ComponentRef } from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { SegmentedControlProps } from './SegmentedControl.props';
import { segmentedControlPropDefs } from './SegmentedControl.props';

const COMPONENT_NAME = 'SegmentedControl';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);
const indicatorClassName = withGlobalPrefix(`${COMPONENT_NAME}Indicator`);
const DATA_ACTIVE = 'data-indicator-active';

type SegmentedControlElement = ComponentRef<'div'>;

export const SegmentedControl = forwardRef<SegmentedControlElement, SegmentedControlProps>(
  (props, ref) => {
    const { indicator = true, ...rest } = props;
    const { className, children, onValueChange, ...segmentedControlProps } = extractProps(
      rest,
      segmentedControlPropDefs,
      marginPropDefs
    );

    const indicatorRef = useRef<HTMLSpanElement>(null);

    const moveIndicator = useCallback((animate: boolean = true) => {
      const indicatorEl = indicatorRef.current;
      const container = indicatorEl?.parentElement;
      if (!container || !indicatorEl) return;

      const pressed = container.querySelector<HTMLElement>('[data-pressed]');
      if (!pressed) {
        indicatorEl.style.opacity = '0';
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const pressedRect = pressed.getBoundingClientRect();
      // Subtract clientLeft so the offset is relative to the padding box, not the border edge
      const left = pressedRect.left - containerRect.left - container.clientLeft;

      if (!animate) {
        indicatorEl.style.transition = 'none';
      }
      indicatorEl.style.transform = `translateX(${left}px)`;
      indicatorEl.style.width = `${pressedRect.width}px`;
      indicatorEl.style.opacity = '1';
      if (!animate) {
        indicatorEl.getBoundingClientRect(); // force reflow
        indicatorEl.style.transition = '';
        // Sync text styling immediately on initial render — no animation to wait for
        pressed.setAttribute(DATA_ACTIVE, '');
      }
    }, []);

    // Position indicator without animation on mount
    useLayoutEffect(() => {
      moveIndicator(false);
    }, [moveIndicator]);

    // When the indicator finishes sliding, move the active text styling to the pressed option.
    // This keeps the colour/weight change in sync with the indicator's arrival rather than
    // changing immediately when [data-pressed] is applied by Base UI.
    useEffect(() => {
      const indicatorEl = indicatorRef.current;
      if (!indicatorEl) return;

      const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName !== 'transform') return;
        const container = indicatorEl.parentElement;
        if (!container) return;

        container.querySelectorAll(`[${DATA_ACTIVE}]`).forEach(el => el.removeAttribute(DATA_ACTIVE));
        container.querySelector<HTMLElement>('[data-pressed]')?.setAttribute(DATA_ACTIVE, '');
      };

      indicatorEl.addEventListener('transitionend', handleTransitionEnd);
      return () => indicatorEl.removeEventListener('transitionend', handleTransitionEnd);
    }, []);

    const handleValueChange = useCallback(
      (value: string[]) => {
        onValueChange?.(value);
        requestAnimationFrame(() => moveIndicator(true));
      },
      [onValueChange, moveIndicator]
    );

    return (
      <ToggleGroupPrimitive
        ref={ref}
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        data-no-indicator={!indicator ? '' : undefined}
        onValueChange={handleValueChange}
        {...segmentedControlProps}
      >
        {indicator && <span ref={indicatorRef} className={indicatorClassName} aria-hidden="true" />}
        {children}
      </ToggleGroupPrimitive>
    );
  }
);

SegmentedControl.displayName = COMPONENT_NAME;
