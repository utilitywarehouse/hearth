import * as React from 'react';
import { Accordion, AccordionContent, MenuContent, MenuItem, Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
  <Accordion type="single" collapsible>
    <AccordionContent forceMount>Content</AccordionContent>
  </Accordion>
  <MenuContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Edit">Edit</MenuItem>
  </MenuContent>
  <Modal open fullScreen loading loadingText="Fetching your details...">
    Content
  </Modal>
  </>
);

export default Component;