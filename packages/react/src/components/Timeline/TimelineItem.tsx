import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { BodyText } from '../BodyText/BodyText';
import { DetailText } from '../DetailText/DetailText';
import type { TimelineItemProps } from './TimelineItem.props';

const COMPONENT_NAME = 'TimelineItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TimelineItemElement = ComponentRef<'li'>;

/**
 * Use TimelineItem as a single event or step within a `Timeline`, showing
 * its `state` — `complete`, `active`, or `incomplete` — via an indicator
 * and connector line alongside its `label`, optional `helperText`, and any
 * additional custom content passed as `children`.
 *
 * @summary A single event or step within a Timeline.
 */
export const TimelineItem = forwardRef<TimelineItemElement, TimelineItemProps>(
  ({ state, label, helperText, className, children, 'aria-label': ariaLabel, ...props }, ref) => {
    const ariaLabelText = [label, `${state} item`, ariaLabel].filter(Boolean).join(', ');

    return (
      <li
        ref={ref}
        className={cn(componentClassName, className)}
        aria-label={ariaLabelText}
        {...props}
      >
        <Flex direction="column" alignItems="center" className={`${componentClassName}Rail`}>
          <span className={`${componentClassName}Indicator`} data-state={state} aria-hidden="true">
            {state === 'complete' ? <TickSmallIcon /> : null}
          </span>
          <div className={`${componentClassName}Connector`} data-state={state} aria-hidden="true" />
        </Flex>

        <Flex direction="column" className={`${componentClassName}Content`}>
          <BodyText as="div" weight="bold">
            {label}
          </BodyText>
          {helperText ? <DetailText as="div">{helperText}</DetailText> : null}
          {children}
        </Flex>
      </li>
    );
  }
);

TimelineItem.displayName = COMPONENT_NAME;
