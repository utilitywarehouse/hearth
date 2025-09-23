import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionTriggerProps } from './AccordionTrigger.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';

const componentName = 'AccordionTrigger';
const componentClassName = withGlobalPrefix(componentName);

type AccordionTriggerElement = ElementRef<'button'>;

export const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <RadixAccordion.Trigger ref={ref} className={clsx(componentClassName, className)} {...props}>
        {title ? (
          <BodyText size="md" weight="semibold">
            {title}
          </BodyText>
        ) : (
          children
        )}

        <ChevronDownSmallIcon className="hearth-AccordionChevron" />
      </RadixAccordion.Trigger>
    );
  }
);

AccordionTrigger.displayName = componentName;
