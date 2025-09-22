import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionProps } from './Accordion.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const componentName = 'Accordion';
const componentClassName = withGlobalPrefix(componentName);

type AccordionElement = ElementRef<'div'>;

export const Accordion = React.forwardRef<AccordionElement, AccordionProps>(
  ({ className, type, heading, headingElement, helperText, link, ...props }, ref) => {
    const singleProps = props as Omit<RadixAccordion.AccordionSingleProps, 'type'>;
    const multipleProps = props as Omit<RadixAccordion.AccordionMultipleProps, 'type'>;

    const headerProps = {
      heading,
      headingElement,
      helperText,
      link,
    };

    return (
      <div className={clsx(componentClassName, className)}>
        {heading ? <SectionHeader {...headerProps} /> : null}
        {type === 'multiple' ? (
          <RadixAccordion.Root ref={ref} type="multiple" {...multipleProps} />
        ) : (
          <RadixAccordion.Root ref={ref} type="single" {...singleProps} />
        )}
      </div>
    );
  }
);

Accordion.displayName = componentName;
