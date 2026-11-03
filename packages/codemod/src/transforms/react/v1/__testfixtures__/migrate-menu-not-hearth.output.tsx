import { MenuItem } from '@mui/material';
import MenuContent from './MenuContent';

const Component = () => (
  <MenuContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Other">Other</MenuItem>
  </MenuContent>
);

export default Component;
