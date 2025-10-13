import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  IconButton,
  Flex,
} from '@utilitywarehouse/hearth-react';
import {
  AddMediumIcon,
  ExpandSmallIcon,
  TrashSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

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
          <MenuItem colorScheme="functional">Item</MenuItem>
          <MenuItem colorScheme="destructive">
            Destructive item
            <TrashSmallIcon />
          </MenuItem>
          <MenuItem disabled>Disabled item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const IconButtonTrigger: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <IconButton variant="outline" colorScheme="functional" label="add">
            <AddMediumIcon />
          </IconButton>
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
            <MenuItem key={n}>Item {n + 1}</MenuItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
  args: {
    open: true,
  },
};

export const Placement: Story = {
  render: args => {
    return (
      <Flex height="400px" width="800px" alignItems="center" justifyContent="center" gap="200">
        <Menu {...args}>
          <MenuTrigger>
            <Button variant="outline" colorScheme="functional">
              Bottom left
            </Button>
          </MenuTrigger>
          <MenuContent placement="bottomLeft">
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuContent>
        </Menu>
        <Menu {...args}>
          <MenuTrigger>
            <Button variant="outline" colorScheme="functional">
              Bottom right
            </Button>
          </MenuTrigger>
          <MenuContent placement="bottomRight">
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuContent>
        </Menu>
        <Menu {...args}>
          <MenuTrigger>
            <Button variant="outline" colorScheme="functional">
              Top left
            </Button>
          </MenuTrigger>
          <MenuContent placement="topLeft">
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuContent>
        </Menu>
        <Menu {...args}>
          <MenuTrigger>
            <Button variant="outline" colorScheme="functional">
              Top right
            </Button>
          </MenuTrigger>
          <MenuContent placement="topRight">
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuContent>
        </Menu>
      </Flex>
    );
  },
};
