import { Button, MenuContent as Content, MenuItem as Item } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <Content keepMounted>
    <Item onClick={() => {}} label="Edit">Edit</Item>
    <Button>Not a menu item</Button>
  </Content>
);

export default Component;
