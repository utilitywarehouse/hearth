import { Button, MenuContent as Content, MenuItem as Item } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <Content forceMount>
    <Item onSelect={() => {}} textValue="Edit">Edit</Item>
    <Button>Not a menu item</Button>
  </Content>
);

export default Component;
