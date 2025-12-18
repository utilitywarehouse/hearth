'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionItemProps } from './AccordionItem.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionHeader } from './AccordionHeader';

const COMPONENT_NAME = 'AccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AccordionItem = ({
  className,
  title,
  description,
  children,
  headingElement,
  ...props
}: AccordionItemProps) => {
  return (
    <AccordionPrimitive.Item className={clsx(componentClassName, className)} {...props}>
      {title ? (
        <div className={`${componentClassName}Header`}>
          <AccordionHeader as={headingElement}>
            <AccordionTrigger>{title}</AccordionTrigger>
          </AccordionHeader>
          {description ? (
            <span className={`${componentClassName}Description`}>{description}</span>
          ) : null}
        </div>
      ) : null}

      {children}
    </AccordionPrimitive.Item>
  );
};

AccordionItem.displayName = COMPONENT_NAME;
