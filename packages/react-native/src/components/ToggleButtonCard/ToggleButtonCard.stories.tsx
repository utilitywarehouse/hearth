import { ToggleButtonCard, ToggleButtonCardGroup } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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

const playgroundOnChange = fn();

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <ToggleButtonCardGroup>
      <ToggleButtonCard
        aria-label="Label 1"
        onChange={playgroundOnChange}
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

    // Selection state moved off gluestack's createRadio(), which rendered a
    // hidden native <input type="radio"> as its source of truth. The
    // migrated ToggleButtonCard shares selection via plain React state (see
    // useSingleSelection) with no backing <input>, so this characterizes the
    // press through the item's own onChange callback contract instead
    // (mirrors PillGroup's approach - see UWDS-4909 for the broader gap
    // around asserting selected/checked state via rendered DOM/style on
    // react-native-web).
    await userEvent.click(toggle);

    expect(playgroundOnChange).toHaveBeenLastCalledWith(true);
  },
};
