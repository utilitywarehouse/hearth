import { ToggleButtonCard, ToggleButtonCardGroup } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / ToggleButtonCard',
  component: ToggleButtonCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the radio.',
    },
  },
  args: {
    label: '',
  },
} satisfies Meta<typeof ToggleButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <ToggleButtonCardGroup>
      <ToggleButtonCard
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="ToggleButtonCard-1"
        {...args}
      >
        <BodyText>Toggle Button Content</BodyText>
      </ToggleButtonCard>
    </ToggleButtonCardGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggle = await canvas.findByRole('button', { name: 'Label' });
    const hiddenInput = canvasElement.querySelector('input[type="radio"]') as HTMLInputElement;

    expect(hiddenInput.checked).toBe(false);

    await userEvent.click(toggle);

    // Pressing the ToggleButtonCard's inner toggle button fires the per-item onChange
    // callback (see the onChange handler passed to this story's args) and now also
    // flips the underlying createRadio() radio input's checked state. Previously the
    // click never reached the hidden radio input (the nested ToggleButton intercepted
    // it); ToggleButtonCardRoot now clicks the hidden input directly on web when it's
    // unchecked - see ToggleButtonCardGroup's Playground story for the multi-item
    // characterization.
    expect(hiddenInput.checked).toBe(true);
  },
};
