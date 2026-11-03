import * as React from 'react';
import { AccordionContent, BodyText, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <MenuContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Edit">Edit</MenuItem>
  </MenuContent>
  <AccordionContent forceMount>Content</AccordionContent>
  <Modal open fullScreen loading loadingText="Fetching your details...">
    <BodyText wrap="balance">Content</BodyText>
  </Modal>
  </>
);

export default Component;
