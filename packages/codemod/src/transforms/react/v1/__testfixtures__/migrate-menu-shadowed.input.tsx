import { MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';

const Outer = () => <MenuItem onSelect={() => {}}>Hearth</MenuItem>;

const Inner = ({ MenuItem, MenuContent }) => (
  <MenuContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Local">Local</MenuItem>
  </MenuContent>
);

export { Inner, Outer };
