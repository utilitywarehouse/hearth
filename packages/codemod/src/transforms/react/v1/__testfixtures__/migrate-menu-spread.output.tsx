import { MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';

const Component = (props) => (
  <MenuContent>
    <MenuItem {...props} onSelect={() => {}}>Edit</MenuItem>
  </MenuContent>
);

export default Component;
