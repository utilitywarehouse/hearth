import type { Meta, StoryObj } from '@storybook/react';
import { List } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof List> = {
  title: 'Stories / List',
  component: List,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [undefined, 'subtle', 'emphasis'],
    },
    colorScheme: {
      control: { type: 'radio' },
      options: [undefined, 'white', 'warmWhite'],
    },
    headingElement: {
      control: { type: 'radio' },
      options: ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  args: {
    heading: 'List',
    helperText: 'Helper text',
    variant: undefined,
    colorScheme: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Playground: Story = {
  render: args => (
    <List {...args}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </List>
  ),
};
