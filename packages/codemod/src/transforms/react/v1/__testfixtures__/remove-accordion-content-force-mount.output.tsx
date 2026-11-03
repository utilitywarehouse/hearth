import { AccordionContent } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <div>
    <AccordionContent keepMounted>Content</AccordionContent>
    <AccordionContent keepMounted={false}>Content</AccordionContent>
    <AccordionContent keepMounted={false}>Content</AccordionContent>
    <AccordionContent>Content</AccordionContent>
  </div>
);

export default Component;
