import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Menu, MenuTrigger, MenuContent, MenuItem } from '@utilitywarehouse/hearth-react';
import { ExpandSmallIcon, TrashSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Menu> = {
  title: 'Stories / Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Menu` component to present a short list of actions or options in response to a user’s interaction. Menus are ideal for actions like sorting, filtering, or providing additional options without navigating away from the current screen.',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const Dropdown: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem colorScheme="destructive">
            Destructive item
            <TrashSmallIcon />
          </MenuItem>
          <MenuItem disabled>Disabled item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
  args: {
    open: true,
  },
};

export const ScrollArea: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Many menu items
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          {[...Array(100).keys()].map(n => (
            <MenuItem>Item {n + 1}</MenuItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  args: {
    open: true,
  },
};
