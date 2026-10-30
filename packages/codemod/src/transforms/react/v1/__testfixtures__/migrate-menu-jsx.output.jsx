import { MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';

const Component = ({ onEdit }) => (
  <MenuContent keepMounted>
    <MenuItem onClick={onEdit} label="Edit">Edit</MenuItem>
  </MenuContent>
);

export default Component;
