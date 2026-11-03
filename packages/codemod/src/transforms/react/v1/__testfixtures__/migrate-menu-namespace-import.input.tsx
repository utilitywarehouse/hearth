import * as H from '@utilitywarehouse/hearth-react';

const Component = () => (
  <H.MenuContent forceMount>
    <H.MenuItem onSelect={() => {}} textValue="Edit">Edit</H.MenuItem>
    <H.Button onSelect={() => {}}>Not a menu item</H.Button>
  </H.MenuContent>
);

export default Component;
