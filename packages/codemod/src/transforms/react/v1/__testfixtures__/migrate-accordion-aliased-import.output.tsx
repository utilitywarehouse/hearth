import * as React from 'react';
import {
  Accordion as HearthAccordion,
  AccordionContent as HearthAccordionContent,
} from '@utilitywarehouse/hearth-react';

const Component = () => (
  <HearthAccordion multiple>
    <HearthAccordionContent keepMounted>Content</HearthAccordionContent>
  </HearthAccordion>
);

export default Component;

