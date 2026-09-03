import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';
import { MenuTrigger } from './MenuTrigger';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof MenuTrigger> = {
  title: 'Components / Menu / MenuTrigger',
  component: MenuTrigger,
};

export default meta;
type Story = StoryObj<typeof MenuTrigger>;

export const Playground: Story = {
  tags: ['!test'],
  render: args => {
    return (
      <Menu>
        <MenuTrigger {...args}>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};
