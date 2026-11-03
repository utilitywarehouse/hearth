import { AccordionContent } from '@utilitywarehouse/hearth-react';

const Component = ({ force, keep, contentProps }) => (
  <>
    <AccordionContent forceMount={force}>One</AccordionContent>
    <AccordionContent forceMount keepMounted={keep}>Two</AccordionContent>
    <AccordionContent {...contentProps} forceMount>Three</AccordionContent>
  </>
);

export default Component;
