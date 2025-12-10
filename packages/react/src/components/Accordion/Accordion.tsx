'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionProps } from './Accordion.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Accordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Accordion = (props: AccordionProps) => {
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

  const accordionProps = { type, ...restProps } as React.ComponentPropsWithRef<
    typeof AccordionPrimitive.Root
  >;

  return (
    <div className={clsx(componentClassName, className)}>
      {heading ? <SectionHeader {...sectionHeaderProps} /> : null}
      <AccordionPrimitive.Root {...accordionProps} />
    </div>
  );
};

Accordion.displayName = COMPONENT_NAME;
