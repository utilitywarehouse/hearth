import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { timelinePropDefs } from './Timeline.props';
import type { TimelineProps } from './Timeline.props';

const COMPONENT_NAME = 'Timeline';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TimelineElement = ComponentRef<'ol'>;

/**
 * Use Timeline to show a sequence of events or steps, each rendered as a
 * `TimelineItem`, in the order they occur. Use the `progress` variant when
 * the sequence represents the user's advancement through it; use `static`
 * for a purely informational history or schedule. For a multi-step process
 * the user actively navigates, use ProgressStepper instead.
 *
 * @summary Shows a vertical sequence of events or steps.
 */
export const Timeline = forwardRef<TimelineElement, TimelineProps>((props, ref) => {
  const { className, children, ...timelineProps } = extractProps(
    props,
    timelinePropDefs,
    marginPropDefs
  );

  return (
    <ol
      ref={ref}
      role="list"
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...timelineProps}
    >
      {children}
    </ol>
  );
});

Timeline.displayName = COMPONENT_NAME;
