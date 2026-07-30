import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { RadioCard, RadioCardGroup } from '.';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / RadioCardGroup',
  component: RadioCardGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['100', '200', '300', '400'],
      description: 'Use this value to set the RadioCardGroup gap.',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Use this value to set the RadioCardGroup flexDirection.',
    },
    flexWrap: {
      control: 'select',
      options: ['wrap', 'nowrap'],
      description: 'Use this value to set the RadioCardGroup flexWrap.',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'space-between'],
      description: 'Use this value to set the RadioCardGroup justifyContent.',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'stretch'],
      description: 'Use this value to set the RadioCardGroup alignItems.',
    },
    columns: {
      control: 'number',
      description: 'Use this value to set the RadioCardGroup columns.',
    },
    disabled: {
      control: 'boolean',
      description: 'Use this value to disable all RadioCards in the group.',
    },
  },
  args: {
    gap: '200',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columns: undefined,
    disabled: false,
  },
} satisfies Meta<typeof RadioCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ value: _, ...args }) => (
    <RadioCardGroup {...args}>
      <RadioCard aria-label="Label 1" label="Option 1" value="Option 1" nativeID="RadioCard-1">
        <BodyText>Additional content</BodyText>
      </RadioCard>
      <RadioCard aria-label="Label 2" label="Option 2" value="Option 2" nativeID="RadioCard-2">
        <BodyText>Additional content</BodyText>
      </RadioCard>
      <RadioCard aria-label="Label 3" label="Option 3" value="Option 3" nativeID="RadioCard-3">
        <BodyText>Additional content</BodyText>
      </RadioCard>
    </RadioCardGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const option1 = await canvas.findByRole('radio', { name: 'Label 1' });
    const option2 = canvas.getByRole('radio', { name: 'Label 2' });

    expect(option1).not.toBeChecked();

    // Pressing an unselected RadioCard selects it and deselects the previously
    // selected RadioCard in the same group.
    await userEvent.click(option2);
    await waitFor(() => expect(option2).toBeChecked());
    expect(option1).not.toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => (
    <RadioCardGroup {...args}>
      <RadioCard aria-label="Label 1" label="Option 1" value="Option 1" nativeID="RadioCard-1">
        <BodyText>Additional content</BodyText>
      </RadioCard>
      <RadioCard aria-label="Label 2" label="Option 2" value="Option 2" nativeID="RadioCard-2">
        <BodyText>Additional content</BodyText>
      </RadioCard>
    </RadioCardGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const option1 = await canvas.findByRole('radio', { name: 'Label 1' });
    const option2 = canvas.getByRole('radio', { name: 'Label 2' });

    // A disabled RadioCardGroup does not respond to a press on any of its RadioCards.
    await userEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
  },
};

export const LongContent: Story = {
  args: {
    flexDirection: 'column',
  },
  render: args => (
    <RadioCardGroup {...args}>
      <RadioCard aria-label="Label 1" label="Option 1" value="Option 1" nativeID="RadioCard-1">
        <BodyText>Additional content</BodyText>
      </RadioCard>
      <RadioCard
        aria-label="Label 2"
        label="Option 2 with a very long content that should wrap into multiple lines to test the layout of the RadioCard component in such scenarios."
        value="Option 2"
        nativeID="RadioCard-2"
      >
        <BodyText>Additional content</BodyText>
      </RadioCard>
      <RadioCard aria-label="Label 3" label="Option 3" value="Option 3" nativeID="RadioCard-3">
        <BodyText>Additional content</BodyText>
      </RadioCard>
    </RadioCardGroup>
  ),
};
