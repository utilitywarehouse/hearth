import * as React from 'react';
import { Accordion, AccordionContent, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <Accordion type="single" collapsible>
    <AccordionContent forceMount>Content</AccordionContent>
  </Accordion>
  <Modal open fullScreen loading loadingText="Fetching your details...">
    Content
  </Modal>
  </>
);

export default Component;
