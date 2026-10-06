import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';
import { MenuTrigger } from './MenuTrigger';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof MenuContent> = {
  title: 'Components / Menu / MenuContent',
  component: MenuContent,
};

export default meta;
type Story = StoryObj<typeof MenuContent>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  tags: ['!test'],
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Menu>
        <MenuTrigger>
          <Button variant="outline" colorScheme="functional">
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent {...args}>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};
