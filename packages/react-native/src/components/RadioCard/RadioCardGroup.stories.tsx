import { Meta, StoryObj } from '@storybook/react-vite';
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
