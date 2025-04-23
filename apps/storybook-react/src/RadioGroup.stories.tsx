import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, Flex, Radio, RadioTile } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Stories / RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      options: ['column', 'row'],
      control: { type: 'radio' },
    },
    defaultValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    disabled: { control: { type: 'boolean' } },
    contentWidth: { control: { type: 'text' } },
  },
  args: {
    label: 'Label',
    disabled: false,
    helperText: 'Helper text',
    validationText: 'Helper text',
    contentWidth: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex gap="400">
        <RadioGroup {...args} name="with-radio">
          <Radio value="1" label="One" />
          <Radio value="2" label="Two" />
          <Radio value="3" label="Three" />
        </RadioGroup>
        <RadioGroup {...args} name="with-radio-tile">
          <RadioTile value="1" label="One" />
          <RadioTile value="2" label="Two" />
          <RadioTile value="3" label="Three" />
        </RadioGroup>
      </Flex>
    );
  },
};

export const RadioHelperAndValidationText: Story = {
  name: 'Radio HelperText and ValidationText',
  render: args => {
    return (
      <RadioGroup {...args}>
        <Radio value="1" label="One" helperText="One helper text" />
        <Radio value="2" label="Two" helperText="Two helper text" />
        <Radio
          value="3"
          label="Three"
          helperText="Three helper text"
          invalid
          validationText="Invalid"
        />
      </RadioGroup>
    );
  },
  args: {
    defaultValue: '3',
    helperText: '',
    validationText: 'Validation text',
    validationStatus: undefined,
  },
};

export const ContentWidth: Story = {
  name: 'Content Width',
  render: args => {
    return (
      <RadioGroup {...args} helperText="Setting the width of the children elements">
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
  args: { contentWidth: '200px' },
};

export const Controlled: Story = {
  render: args => {
    const options = ['Bear', 'Koala', 'Wolf', 'Horse'];
    const [selected, setSelected] = useState(options[0]);
    return (
      <RadioGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        helperText={`Your favourite animal is a ${selected}`}
      >
        {options.map(animal => (
          <Radio key={animal} value={animal} label={animal} />
        ))}
      </RadioGroup>
    );
  },
  args: {
    errorMessage: 'There is an error',
    label: 'What is your favourite animal?',
  },
};

export const ShowingError: Story = {
  name: 'Error message',
  render: args => {
    const [selected, setSelected] = useState('');
    return (
      <RadioGroup {...args} value={selected} onValueChange={setSelected} error={!selected}>
        <Radio value="1" label="Bear" />
        <Radio value="2" label="Koala" />
        <Radio value="3" label="Wolf" />
        <Radio value="4" label="Horse" />
      </RadioGroup>
    );
  },
  args: {
    errorMessage: 'Please tell us what your favourite animal is.',
    label: 'What is your favourite animal?',
    helperText: 'These are the best animals.',
  },
};

// export const Wrap: Story = {
//   render: args => {
//     return (
//       <Box height="800px" width="400px" padding="16px">
//         <RadioGroup {...args} direction="row" helperText="Child elements will wrap by default">
//           <RadioTile value="1" label="One" />
//           <RadioTile value="2" label="Two" />
//           <RadioTile value="3" label="Three" />
//           <RadioTile value="4" label="Four" />
//           <RadioTile value="5" label="Five" />
//         </RadioGroup>
//       </Box>
//     );
//   },
// };
