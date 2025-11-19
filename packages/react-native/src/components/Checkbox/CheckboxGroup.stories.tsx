import { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxGroup } from '.';

const meta = {
  title: 'Stories / CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the checkbox group.',
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the checkbox group.',
    },
    helperText: {
      type: 'string',
      control: 'text',
      description: 'The helper text of the checkbox group component',
      defaultValue: 'Helper text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the checkbox group component',
      defaultValue: 'initial',
    },
    showValidationIcon: {
      control: 'boolean',
      description: 'Show the validation icon.',
      defaultValue: true,
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the checkbox group component',
      defaultValue: 'Invalid text',
    },
    type: {
      control: 'select',
      options: ['default', 'tile'],
      description: 'The type of the checkbox group component',
      defaultValue: 'default',
    },
  },
  args: {
    disabled: false,
    label: 'Group label',
    helperText: 'Supporting text',
    validationStatus: 'initial',
    showValidationIcon: true,
    invalidText: 'Invalid text',
    validText: 'Valid text',
    type: 'default',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: ['Option 1'],
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ value, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox aria-label="Label 1" label="Option 1" value="Option 1" nativeID="Checkbox-1" />
      <Checkbox
        aria-label="Label 2"
        label="Option 2 (with added option)"
        value="Option 2"
        nativeID="Checkbox-2"
      />
      <Checkbox aria-label="Label 3" label="Option 3" value="Option 3" nativeID="Checkbox-3" />
    </CheckboxGroup>
  ),
};

export const LongContent: Story = {
  args: {
    type: 'tile',
  },
  render: args => (
    <CheckboxGroup {...args}>
      <Checkbox aria-label="Label 1" label="Option 1" value="Option 1" nativeID="Checkbox-1" />
      <Checkbox
        aria-label="Label 2"
        label="Option 2 with a very long content that should wrap into multiple lines to test the layout of the checkbox component in such scenarios."
        value="Option 2"
        nativeID="Checkbox-2"
      />
      <Checkbox aria-label="Label 3" label="Option 3" value="Option 3" nativeID="Checkbox-3" />
    </CheckboxGroup>
  ),
};
