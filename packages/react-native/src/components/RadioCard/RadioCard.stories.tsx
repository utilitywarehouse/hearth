import { RadioCard, RadioCardGroup } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / RadioCard',
  component: RadioCard,
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
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <RadioCardGroup>
      <RadioCard
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="RadioCard-1"
        {...args}
      >
        <BodyText>Radio Content</BodyText>
      </RadioCard>
    </RadioCardGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const option1 = await canvas.findByRole('radio', { name: 'Label 1' });
    expect(option1).not.toBeChecked();

    // Pressing an unselected RadioCard selects it.
    await userEvent.click(option1);
    await waitFor(() => expect(option1).toBeChecked());
  },
};
