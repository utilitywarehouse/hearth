'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Collapsible } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { ExpandableCardProps } from './ExpandableCard.props';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Divider } from '../Divider/Divider';

const COMPONENT_NAME = 'ExpandableCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ExpandableCardElement = ComponentRef<'div'>;

export const ExpandableCard = forwardRef<ExpandableCardElement, ExpandableCardProps>(
  (props, ref) => {
    const { className, heading, helperText, leadingContent, children, ...restProps } = extractProps(
      props,
      marginPropDefs
    );

    return (
      <Collapsible.Root ref={ref} className={cn(componentClassName, className)} {...restProps}>
        <Collapsible.Trigger className={`${componentClassName}Trigger`}>
          {leadingContent ? (
            <span className={`${componentClassName}LeadingContent`}>{leadingContent}</span>
          ) : null}
          <span className={`${componentClassName}HeadingWrapper`}>
            <span className={`${componentClassName}Heading`}>{heading}</span>
            {helperText ? (
              <span className={`${componentClassName}HelperText`}>{helperText}</span>
            ) : null}
          </span>
          <ChevronDownSmallIcon className={`${componentClassName}Chevron`} aria-hidden />
        </Collapsible.Trigger>
        <Collapsible.Content className={`${componentClassName}Content`}>
          <Divider decorative />
          <div className={`${componentClassName}ContentInner`}>{children}</div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }
);

ExpandableCard.displayName = COMPONENT_NAME;
