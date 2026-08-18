import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ToggleButtonCard, ToggleButtonCardGroup } from '.';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / ToggleButtonCardGroup',
  component: ToggleButtonCardGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['100', '200', '300', '400'],
      description: 'Use this value to set the ToggleButtonCardGroup gap.',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Use this value to set the ToggleButtonCardGroup flexDirection.',
    },
    flexWrap: {
      control: 'select',
      options: ['wrap', 'nowrap'],
      description: 'Use this value to set the ToggleButtonCardGroup flexWrap.',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'space-between'],
      description: 'Use this value to set the ToggleButtonCardGroup justifyContent.',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'stretch'],
      description: 'Use this value to set the ToggleButtonCardGroup alignItems.',
    },
    columns: {
      control: 'number',
      description: 'Use this value to set the ToggleButtonCardGroup columns.',
    },
  },
  args: {
    gap: '200',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columns: undefined,
  },
} satisfies Meta<typeof ToggleButtonCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const playgroundOnValueChange = fn();

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ value: _, ...args }) => (
    <ToggleButtonCardGroup {...args} onValueChange={playgroundOnValueChange}>
      <ToggleButtonCard
        aria-label="Label 1"
        label="Option 1"
        value="Option 1"
        nativeID="ToggleButtonCard-1"
      >
        <BodyText>Additional content for option</BodyText>
      </ToggleButtonCard>
      <ToggleButtonCard
        aria-label="Label 2"
        label="Option 2 "
        value="Option 2"
        nativeID="ToggleButtonCard-2"
      >
        <BodyText>Additional content for option</BodyText>
      </ToggleButtonCard>
      <ToggleButtonCard
        aria-label="Label 3"
        label="Option 3"
        value="Option 3"
        nativeID="ToggleButtonCard-3"
      >
        <BodyText>Additional content for option</BodyText>
      </ToggleButtonCard>
    </ToggleButtonCardGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggle1 = await canvas.findByRole('button', { name: 'Option 1' });
    const toggle2 = canvas.getByRole('button', { name: /Option 2/ });

    // Selection state moved off gluestack's createRadio(), which rendered a
    // hidden native <input type="radio"> per option as its source of truth.
    // The migrated ToggleButtonCard/ToggleButtonCardGroup share selection via
    // plain React state (see useSingleSelection) with no backing <input>, so
    // this characterizes selection through the onValueChange callback
    // contract instead of querying for an input element that no longer
    // exists (mirrors PillGroup's approach - see UWDS-4909 for the broader
    // gap around asserting selected/checked state via rendered DOM/style on
    // react-native-web).
    await userEvent.click(toggle2);
    expect(playgroundOnValueChange).toHaveBeenLastCalledWith('Option 2');

    await userEvent.click(toggle1);
    expect(playgroundOnValueChange).toHaveBeenLastCalledWith('Option 1');
  },
};
