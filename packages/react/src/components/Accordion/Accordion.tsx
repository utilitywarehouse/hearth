'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentPropsWithRef, ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionProps } from './Accordion.props';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Accordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionElement = ComponentRef<'div'>;

export const Accordion = forwardRef<AccordionElement, AccordionProps>((props, ref) => {
  const {
    className,
    multiple = true,
    heading,
    headingElement = 'h2',
    helperText,
    trailingContent,
    validationText,
    validationStatus,
    ...restProps
  } = extractProps(props, marginPropDefs);

  const sectionHeaderProps = {
    heading,
    headingElement,
    helperText,
    trailingContent,
    validationText,
    validationStatus,
  };

  const accordionProps = { multiple, ...restProps } as ComponentPropsWithRef<
    typeof AccordionPrimitive.Root<string>
  >;

  return (
    <div ref={ref} className={cn(componentClassName, className)} data-testid={componentClassName}>
      {heading ? <SectionHeader {...sectionHeaderProps} /> : null}
      <AccordionPrimitive.Root {...accordionProps} />
    </div>
  );
});

Accordion.displayName = COMPONENT_NAME;
