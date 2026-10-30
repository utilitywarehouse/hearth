import * as React from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger } from '@utilitywarehouse/hearth-react';

const Component = ({ onEdit }: { onEdit: () => void }) => (
  <Menu>
    <MenuTrigger>
      <Button>Open</Button>
    </MenuTrigger>
    <MenuContent forceMount>
      <MenuItem onSelect={onEdit} textValue="Edit">Edit</MenuItem>
      <MenuItem onSelect={() => console.log('copy')}>Copy</MenuItem>
      <MenuItem textValue="Remove" label="Delete">Delete</MenuItem>
      <MenuItem textValue="Archive" label={'Archive item'}>Archive</MenuItem>
    </MenuContent>
    <MenuContent forceMount keepMounted={false}>
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
);

export default Component;
