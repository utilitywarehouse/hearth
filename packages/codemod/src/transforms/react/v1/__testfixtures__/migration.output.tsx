import * as React from 'react';
import { Accordion, AccordionContent, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <Accordion>
    <AccordionContent keepMounted>Content</AccordionContent>
  </Accordion>
  <MenuContent keepMounted>
    <MenuItem onClick={() => {}} label="Edit">Edit</MenuItem>
  </MenuContent>
  <Modal open loading loadingHeading="Fetching your details...">
    Content
  </Modal>
  </>
);

export default Component;