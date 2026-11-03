import * as React from 'react';
import { AccordionContent, BodyText, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <MenuContent keepMounted>
    <MenuItem onClick={() => {}} label="Edit">Edit</MenuItem>
  </MenuContent>
  <AccordionContent keepMounted>Content</AccordionContent>
  <Modal open loading loadingHeading="Fetching your details...">
    <BodyText textWrap="balance">Content</BodyText>
  </Modal>
  </>
);

export default Component;
