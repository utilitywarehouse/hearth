'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionContentProps } from './AccordionContent.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'AccordionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => {
  return (
    <AccordionPrimitive.Content className={clsx(componentClassName, className)} {...props}>
      <BodyText as="div" className={`${componentClassName}Text`}>
        {children}
      </BodyText>
    </AccordionPrimitive.Content>
  );
};

AccordionContent.displayName = COMPONENT_NAME;
