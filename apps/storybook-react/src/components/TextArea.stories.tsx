import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea, Flex, TextInput } from '@utilitywarehouse/hearth-react';
import React from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'Stories / TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          '`TextArea` is a multi-line text input field that allows users to enter longer text content.',
      },
    },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    placeholder: { control: { type: 'text' } },
    rows: { control: { type: 'number' } },
    resize: { control: { type: 'radio' }, options: ['none', 'horizontal', 'vertical', 'both'] },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    placeholder: 'Enter your text here...',
    rows: 3,
    cols: 40,
    resize: 'none',
    disabled: false,
    readOnly: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {};

export const DisabledAndReadOnly: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea {...args} label="Disabled" disabled helperText="This field is disabled." />
      <TextArea
        {...args}
        label="Read-only"
        readOnly
        value="This is a read-only text area."
        helperText="This field is read-only."
      />
    </Flex>
  ),
  args: { helperText: undefined },
};

export const Validation: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea
        {...args}
        label="Valid TextArea"
        validationStatus="valid"
        validationText="Looks good!"
        value="This is valid input."
      />
      <TextArea
        {...args}
        label="Invalid TextArea"
        validationStatus="invalid"
        validationText="Please correct the error."
        value="This is invalid input."
      />
    </Flex>
  ),
  args: { helperText: undefined },
};

export const CustomRows: Story = {
  render: args => (
    <Flex direction="column" gap="400">
      <TextArea {...args} label="3 Rows" rows={3} />
      <TextArea {...args} label="5 Rows" rows={5} />
      <TextArea {...args} label="10 Rows" rows={10} />
    </Flex>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = React.useState<string>('Initial value');
    return (
      <TextArea
        {...args}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
        label="Controlled TextArea"
      />
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <Flex width="600px" direction="column" gap="400">
      <TextInput label="Text input" />
      <TextArea label="Text area" rows={3} cols={60} />
    </Flex>
  ),
};
