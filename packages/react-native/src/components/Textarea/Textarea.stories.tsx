import { Meta, StoryObj } from '@storybook/react-native';
import { Textarea } from '.';

const meta = {
  title: 'Stories / Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The Textarea field placeholder',
      defaultValue: '',
    },
    label: {
      control: 'text',
      description: 'The label for the Textarea component',
      defaultValue: 'Textarea label',
    },
    labelVariant: {
      control: 'radio',
      options: ['heading', 'body'],
      description: 'The label variant for the Textarea component',
    },
    helperText: {
      control: 'text',
      description: 'The helper text for the Textarea component',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the Textarea component',
      defaultValue: 'initial',
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text for the Textarea component',
    },
    validText: {
      control: 'text',
      description: 'The valid text for the Textarea component',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Textarea component',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only the Textarea component',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focus the Textarea component',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the Textarea component is required',
      defaultValue: true,
    },
    resizable: {
      control: 'boolean',
      description: 'Enables a drag handle to resize the Textarea vertically',
      defaultValue: false,
    },
  },
  args: {
    placeholder: 'Textarea placeholder',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
    resizable: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Resizable: Story = {
  args: {
    label: 'Notes',
    helperText: 'Drag the bottom-right handle to resize',
    placeholder: 'Add more detail here...',
    resizable: true,
  },
};
