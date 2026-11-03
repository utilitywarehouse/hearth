import { AccordionContent } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <div>
    <AccordionContent forceMount>Content</AccordionContent>
    <AccordionContent forceMount={false}>Content</AccordionContent>
    <AccordionContent forceMount keepMounted={false}>Content</AccordionContent>
    <AccordionContent>Content</AccordionContent>
  </div>
);

export default Component;
