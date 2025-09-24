import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionContentProps } from './AccordionContent.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';

const componentName = 'AccordionContent';
const componentClassName = withGlobalPrefix(componentName);

type AccordionContentElement = ElementRef<'div'>;

export const AccordionContent = React.forwardRef<AccordionContentElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixAccordion.Content ref={ref} className={clsx(componentClassName, className)} {...props}>
        <BodyText as="div" className="hearth-AccordionContentText">
          {children}
        </BodyText>
      </RadixAccordion.Content>
    );
  }
);

AccordionContent.displayName = componentName;
