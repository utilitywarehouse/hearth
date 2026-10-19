import * as React from 'react';
import { Accordion, AccordionContent, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <Accordion>
    <AccordionContent keepMounted>Content</AccordionContent>
  </Accordion>
  <Modal open loading loadingHeading="Fetching your details...">
    Content
  </Modal>
  </>
);

export default Component;
