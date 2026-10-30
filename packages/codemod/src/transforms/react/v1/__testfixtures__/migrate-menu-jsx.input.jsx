import { MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';

const Component = ({ onEdit }) => (
  <MenuContent forceMount>
    <MenuItem onSelect={onEdit} textValue="Edit">Edit</MenuItem>
  </MenuContent>
);

export default Component;
