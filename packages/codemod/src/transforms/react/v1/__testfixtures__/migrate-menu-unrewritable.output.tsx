import { Menu, MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';

const Component = ({ itemLabel, keep, itemProps, contentProps }) => (
  <Menu>
    <MenuContent forceMount keepMounted={keep}>
      <MenuItem onSelect={() => {}} onClick={() => {}}>One</MenuItem>
      <MenuItem textValue="Two" label={itemLabel}>Two</MenuItem>
      <MenuItem {...itemProps}>Three</MenuItem>
    </MenuContent>
    <MenuContent {...contentProps}>Four</MenuContent>
  </Menu>
);

export default Component;
