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

const detachedHandle = Menu.createHandle();

const meta: Meta<typeof Menu> = {
  title: 'Components / Menu',
  component: Menu,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Menu>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set defaultOpen to render the Menu already open on mount. */
export const DefaultOpen: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set keepMounted on MenuContent to keep menu items in the DOM even when closed, so they remain crawlable. */
export const SEOFriendly: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Menu {...args}>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent keepMounted>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

/** MenuTrigger can wrap an IconButton instead of a Button. */
export const IconButtonTrigger: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/**
 * Use a shared handle (from Menu.createHandle) to connect a MenuTrigger to a
 * Menu that renders elsewhere in the tree, instead of nesting them.
 */
export const DetachedTrigger: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    return (
      <Flex gap="300" alignItems="center">
        {/* MenuTrigger lives outside Menu — connected via handle */}
        <MenuTrigger handle={detachedHandle}>
          <Button variant="outline" colorScheme="functional">
            Open menu
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        {/* Menu has no MenuTrigger child — it opens via the handle above */}
        <Menu handle={detachedHandle}>
          <MenuContent>
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuContent>
        </Menu>
      </Flex>
    );
  },
};

/** MenuContent scrolls once its items exceed the available height. */
export const ScrollArea: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set placement on MenuContent to control which side of the trigger it opens on. */
export const Placement: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { modal: false },
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

/** Set modal to false to allow interaction with the rest of the page while the Menu is open. */
export const Modality: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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
      </Flex>
    );
  },
};
