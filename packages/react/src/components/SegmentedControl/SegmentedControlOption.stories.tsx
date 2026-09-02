import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlOption } from './SegmentedControlOption';

const meta: Meta<typeof SegmentedControlOption> = {
  title: 'Components / SegmentedControl / SegmentedControlOption',
  component: SegmentedControlOption,
  argTypes: {
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Option 1',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControlOption>;

export const Playground: Story = {
  render: args => (
    <SegmentedControl defaultValue={['option-1']} size="sm">
      <SegmentedControlOption {...args} value="option-1" />
      <SegmentedControlOption value="option-2" label="Option 2" />
      <SegmentedControlOption value="option-3" label="Option 3" />
    </SegmentedControl>
  ),
};
