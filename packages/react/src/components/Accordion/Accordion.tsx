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

/**
 * Use Accordion to let users expand or collapse individual content sections,
 * presenting a large amount of information in a compact, organised interface.
 * Compose it with `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, and
 * `AccordionContent` for each disclosure item. By default only one item can
 * be expanded at once — set `multiple` to allow more than one item to be
 * expanded simultaneously.
 *
 * @summary A vertically stacked set of expandable and collapsible content sections.
 */
export const Accordion = forwardRef<AccordionElement, AccordionProps>((props, ref) => {
  const {
    className,
    multiple = false,
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
