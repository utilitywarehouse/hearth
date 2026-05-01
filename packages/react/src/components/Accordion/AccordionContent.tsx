'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionContentProps } from './AccordionContent.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'AccordionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionContentElement = ComponentRef<'div'>;

// Matches the h-slide-up animation duration (200ms) plus a small buffer.
// Used as a fallback when animationend never fires (e.g. prefers-reduced-motion).
const ANIMATION_FALLBACK_MS = 250;

export const AccordionContent = forwardRef<AccordionContentElement, AccordionContentProps>(
  ({ className, children, forceMount, ...props }, ref) => {
    const internalRef = useRef<AccordionContentElement>(null);
    const mergedRef = useMergedRefs(internalRef, ref);

    useLayoutEffect(() => {
      const node = internalRef.current;
      if (!node || !forceMount) return;

      node.hidden = node.dataset.state !== 'open';

      let pendingCleanup: (() => void) | undefined;

      const observer = new MutationObserver(() => {
        pendingCleanup?.();
        pendingCleanup = undefined;

        if (node.dataset.state === 'open') {
          node.hidden = false;
        } else {
          // When forceMount is set, Radix's layout effect measures the element while it's
          // hidden (display:none), so getBoundingClientRect() returns 0. This corrupts
          // --radix-accordion-content-height, causing the h-slide-up animation to have
          // no valid `from` height. This observer fires after layout effects but before
          // paint, so we can re-measure the real height, correct the property, and restart
          // the animation before the first frame renders.
          const h = node.getBoundingClientRect().height;
          if (h > 0) {
            node.style.setProperty('--radix-accordion-content-height', `${h}px`);
            // Cancel and restart the animation so it picks up the corrected property.
            // The forced reflow between 'none' and '' commits the cancelled state before
            // the browser starts the fresh animation.
            node.style.animationName = 'none';
            void node.offsetHeight;
            node.style.animationName = '';
          }

          // eslint-disable-next-line prefer-const
          let timer: ReturnType<typeof setTimeout>;
          const onAnimationEnd = (e: AnimationEvent) => {
            if (e.target !== node) return;
            clearTimeout(timer);
            node.removeEventListener('animationend', onAnimationEnd);
            node.hidden = true;
          };

          node.addEventListener('animationend', onAnimationEnd);
          timer = setTimeout(() => {
            node.removeEventListener('animationend', onAnimationEnd);
            node.hidden = true;
          }, ANIMATION_FALLBACK_MS);

          pendingCleanup = () => {
            clearTimeout(timer);
            node.removeEventListener('animationend', onAnimationEnd);
          };
        }
      });

      observer.observe(node, { attributes: true, attributeFilter: ['data-state'] });

      return () => {
        observer.disconnect();
        pendingCleanup?.();
        node.hidden = false;
      };
    }, [forceMount]);

    return (
      <AccordionPrimitive.Content
        ref={mergedRef}
        className={cn(componentClassName, className)}
        forceMount={forceMount}
        {...props}
      >
        <BodyText as="div" className={`${componentClassName}Text`}>
          {children}
        </BodyText>
      </AccordionPrimitive.Content>
    );
  }
);

AccordionContent.displayName = COMPONENT_NAME;
