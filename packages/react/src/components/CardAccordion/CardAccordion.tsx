'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentPropsWithRef, ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionProps } from './CardAccordion.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'CardAccordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionElement = ComponentRef<'div'>;

export const CardAccordion = forwardRef<CardAccordionElement, CardAccordionProps>((props, ref) => {
  const {
    className,
    type = 'multiple',
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

  const accordionProps = { type, ...restProps } as ComponentPropsWithRef<
    typeof CardAccordionPrimitive.Root
  >;

  return (
    <div ref={ref} className={cn(componentClassName, className)}>
      {heading ? <SectionHeader {...sectionHeaderProps} /> : null}
      <CardAccordionPrimitive.Root {...accordionProps} />
    </div>
  );
});

CardAccordion.displayName = COMPONENT_NAME;
