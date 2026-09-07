import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';
import { MenuTrigger } from './MenuTrigger';
import {
  ExpandSmallIcon,
  OpenSmallIcon,
  TrashSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof MenuItem> = {
  title: 'Components / Menu / MenuItem',
  component: MenuItem,
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Playground: Story = {
  tags: ['!test'],
  render: args => {
    return (
      <Menu defaultOpen>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem {...args}>Item</MenuItem>
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
