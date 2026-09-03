import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components / ToggleButton / ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    type: { control: { type: 'radio' }, options: ['single', 'multiple'] },
  },
  args: {
    type: 'single',
    gap: '200',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Playground: Story = {
  render: args => (
    <ToggleGroup {...args}>
      <ToggleButton value="one">Label</ToggleButton>
      <ToggleButton value="two">Label</ToggleButton>
      <ToggleButton value="three">Label</ToggleButton>
    </ToggleGroup>
  ),
};
