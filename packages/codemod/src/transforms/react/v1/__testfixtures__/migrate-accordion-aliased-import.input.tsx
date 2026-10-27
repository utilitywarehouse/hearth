import * as React from 'react';
import {
  Accordion as HearthAccordion,
  AccordionContent as HearthAccordionContent,
} from '@utilitywarehouse/hearth-react';

const Component = () => (
  <HearthAccordion type="multiple" collapsible>
    <HearthAccordionContent forceMount>Content</HearthAccordionContent>
  </HearthAccordion>
);

export default Component;
