import * as React from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger } from '@utilitywarehouse/hearth-react';

const Component = ({ onEdit }: { onEdit: () => void }) => (
  <Menu>
    <MenuTrigger>
      <Button>Open</Button>
    </MenuTrigger>
    <MenuContent keepMounted>
      <MenuItem onClick={onEdit} label="Edit">Edit</MenuItem>
      <MenuItem onClick={() => console.log('copy')}>Copy</MenuItem>
      <MenuItem label="Delete">Delete</MenuItem>
      <MenuItem label={'Archive item'}>Archive</MenuItem>
    </MenuContent>
    <MenuContent keepMounted={false}>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
);

export default Component;
