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
  /**
   * Extends the final `TimelineItem`'s connector line beyond the list,
   * fading it to transparent, to suggest the timeline continues. Only takes
   * effect when `variant` is `progress` and the final item's `state` is
   * `incomplete`.
   * @default false
   */
  danglingRail: { className: 'dangling-rail', responsive: false },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  danglingRail: PropDef<boolean>;
};

export interface TimelineProps extends ComponentPropsWithRef<'ol'>, MarginProps {
  /**
   * Controls the size of each `TimelineItem`'s indicator — `static` renders a
   * small dot, `progress` renders a larger circle that can carry a complete
   * icon.
   * @default static
   */
  variant?: (typeof variants)[number];
  /**
   * Extends the final `TimelineItem`'s connector line beyond the list,
   * fading it to transparent, to suggest the timeline continues. Only takes
   * effect when `variant` is `progress` and the final item's `state` is
   * `incomplete`.
   * @default false
   */
  danglingRail?: boolean;
}
