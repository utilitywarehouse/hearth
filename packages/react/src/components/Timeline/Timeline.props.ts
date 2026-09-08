import { MarginProps } from '../../props/margin.props';
import type { PropDef } from '../../props/prop-def';
import type { ComponentPropsWithRef } from 'react';

const variants = ['static', 'progress'] as const;

export const timelinePropDefs = {
  /**
   * Controls the size of each `TimelineItem`'s indicator — `static` renders a
   * small dot, `progress` renders a larger circle that can carry a complete
   * icon.
   * @default static
   */
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'static' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export interface TimelineProps extends ComponentPropsWithRef<'ol'>, MarginProps {
  /**
   * Controls the size of each `TimelineItem`'s indicator — `static` renders a
   * small dot, `progress` renders a larger circle that can carry a complete
   * icon.
   * @default static
   */
  variant?: (typeof variants)[number];
}
