import * as H from '@utilitywarehouse/hearth-react';

const Component = () => (
  <H.Accordion>
    <H.AccordionContent keepMounted>Content</H.AccordionContent>
    <H.Button forceMount>Not an accordion content</H.Button>
  </H.Accordion>
);

export default Component;
