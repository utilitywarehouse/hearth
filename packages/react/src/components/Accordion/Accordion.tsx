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
  ({ className, type = 'multiple', heading, headingElement, helperText, link, ...props }, ref) => {
    const headerProps = {
      heading,
      headingElement,
      helperText,
      link,
    };
    const accordionProps = {
      type,
      ...props,
    };

    return (
      <div className={clsx(componentClassName, className)}>
        {heading ? <SectionHeader {...headerProps} /> : null}
        <RadixAccordion.Root
          ref={ref}
          {...(accordionProps as React.ComponentProps<typeof RadixAccordion.Root>)}
        />
      </div>
    );
  }
);

Accordion.displayName = componentName;
