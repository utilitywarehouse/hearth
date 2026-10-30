import * as React from 'react';
import { BodyText, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <MenuContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Edit">Edit</MenuItem>
  </MenuContent>
  <Modal open fullScreen loading loadingText="Fetching your details...">
    <BodyText wrap="balance">Content</BodyText>
  </Modal>
  </>
);

export default Component;
