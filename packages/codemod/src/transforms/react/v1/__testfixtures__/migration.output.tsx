import * as React from 'react';
import { BodyText, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <MenuContent keepMounted>
    <MenuItem onClick={() => {}} label="Edit">Edit</MenuItem>
  </MenuContent>
  <Modal open loading loadingHeading="Fetching your details...">
    <BodyText textWrap="balance">Content</BodyText>
  </Modal>
  </>
);

export default Component;
