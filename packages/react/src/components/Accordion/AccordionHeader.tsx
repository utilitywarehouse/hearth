import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Accordion as RadixAccordion } from 'radix-ui';
import { AccordionHeaderProps } from './AccordionHeader.props';

const COMPONENT_NAME = 'AccordionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionHeaderElement = ElementRef<'h3'>;

export const AccordionHeader = React.forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  ({ className, as: Tag = 'h3', children, ...props }, ref) => {
    return (
      <RadixAccordion.Header
        asChild
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
      >
        <Tag>{children}</Tag>
      </RadixAccordion.Header>
    );
  }
);

AccordionHeader.displayName = COMPONENT_NAME;
