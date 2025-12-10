'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import type { AccordionHeaderProps } from './AccordionHeader.props';

const COMPONENT_NAME = 'AccordionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AccordionHeader = ({
  className,
  as: Tag = 'h3',
  children,
  ...props
}: AccordionHeaderProps) => {
  return (
    <AccordionPrimitive.Header asChild className={clsx(componentClassName, className)} {...props}>
      <Tag>{children}</Tag>
    </AccordionPrimitive.Header>
  );
};

AccordionHeader.displayName = COMPONENT_NAME;
