import type { MenuItem } from '@utilitywarehouse/hearth-react';
import { type MenuContent as InlineContent } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <InlineContent forceMount>
    <MenuItem onSelect={() => {}} textValue="Type-only import">Content</MenuItem>
  </InlineContent>
);

export default Component;
