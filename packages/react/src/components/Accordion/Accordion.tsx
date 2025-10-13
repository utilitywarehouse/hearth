import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionProps } from './Accordion.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Accordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionElement = ElementRef<'div'>;

export const Accordion = React.forwardRef<AccordionElement, AccordionProps>((props, ref) => {
  const {
    className,
    type = 'multiple',
    heading,
    headingElement = 'h2',
    helperText,
    trailingContent,
    ...restProps
  } = extractProps(props, marginPropDefs);

  const headerProps = {
    heading,
    headingElement,
    helperText,
    trailingContent,
  };

  const accordionProps = {
    type,
    ...restProps,
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
});

Accordion.displayName = COMPONENT_NAME;
