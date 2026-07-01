import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { IconButton } from '../IconButton/IconButton';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';
import { MenuTrigger } from './MenuTrigger';
import {
  AddMediumIcon,
  ExpandSmallIcon,
  OpenSmallIcon,
  TrashSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Menu> = {
  title: 'Components / Menu',
  component: Menu,
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
          <MenuItem asChild>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              Navigation Item
              <OpenSmallIcon />
            </a>
          </MenuItem>
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

export const DefaultOpen: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  args: { defaultOpen: true },
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
          <MenuItem asChild>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              Navigation Item
              <OpenSmallIcon />
            </a>
          </MenuItem>
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

export const SEOFriendly: Story = {
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent forceMount>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
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

export const Modality: Story = {
  args: { modal: false },
  render: args => {
    return (
      <Flex gap="300">
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
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                Navigation Item
                <OpenSmallIcon />
              </a>
            </MenuItem>
            <MenuItem colorScheme="functional">Item</MenuItem>
            <MenuItem colorScheme="destructive">
              Destructive item
              <TrashSmallIcon />
            </MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
          </MenuContent>
        </Menu>

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
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                Navigation Item
                <OpenSmallIcon />
              </a>
            </MenuItem>
            <MenuItem colorScheme="functional">Item</MenuItem>
            <MenuItem colorScheme="destructive">
              Destructive item
              <TrashSmallIcon />
            </MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
          </MenuContent>
        </Menu>
      </Flex>
    );
  },
};
