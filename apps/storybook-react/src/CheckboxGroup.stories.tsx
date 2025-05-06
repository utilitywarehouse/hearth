import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup, Flex, CheckboxTile, Box, BodyText } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Stories / CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component:
          '`CheckboxGroup` provides a set of interactive buttons where multiple options can be selected at a time. The `CheckboxGroup` uses a fieldset to group related `Checkbox` controls. The `CheckboxGroup` is responsible for handling the value, label, helper text, validation, and disabled state, as well as determining the presentation and selection of the items in the list.',
      },
    },
  },
  argTypes: {
    direction: {
      options: ['column', 'row'],
      control: { type: 'radio' },
    },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    validationStatus: { control: { type: 'radio' }, options: [undefined, 'valid', 'invalid'] },
    disabled: { control: { type: 'boolean' } },
    contentWidth: { control: { type: 'text' } },
  },
  args: {
    label: 'Which services do you currently have with UW?',
    defaultValue: ['1', '2'],
    direction: 'column',
    disabled: false,
    helperText: 'Select all that apply',
    validationText: 'Validation text',
    contentWidth: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Playground: Story = {
  render: args => (
    <Flex asChild gap="800">
      <form>
        <CheckboxGroup {...args} name="checkbox-story">
          <CheckboxTile value="1" label="Energy" />
          <CheckboxTile value="2" label="Broadband" />
          <CheckboxTile value="3" label="Mobile" />
          <CheckboxTile value="4" label="Insurance" />
        </CheckboxGroup>
      </form>
    </Flex>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(['1']);
    return (
      <Flex direction="column" gap="400">
        <BodyText>Checked: {value.join(', ')}</BodyText>
        <CheckboxGroup defaultValue={value} onValueChange={v => setValue(v)}>
          <CheckboxTile value="1" label="One" />
          <CheckboxTile value="2" label="Two" />
          <CheckboxTile value="3" label="Three" />
        </CheckboxGroup>
      </Flex>
    );
  },
};

export const CheckboxHelperText: Story = {
  name: 'Checkbox HelperText',
  render: args => {
    return (
      <CheckboxGroup {...args}>
        <CheckboxTile value="1" label="Rap" helperText="Including Grime" />
        <CheckboxTile value="2" label="Rock" helperText="Including Heavy Metal" />
        <CheckboxTile value="3" label="Folk" helperText="Including World music" />
        <CheckboxTile value="4" label="Dance" helperText="Including House music" />
      </CheckboxGroup>
    );
  },
  args: {
    label: 'Choose music you enjoy.',
    helperText: 'Please choose wisely.',
  },
};

export const Validation: Story = {
  name: 'Validation',
  render: args => {
    const [selected, setSelected] = useState<Array<string>>([]);
    return (
      <CheckboxGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        validationStatus={selected.length < 2 ? 'invalid' : undefined}
      >
        <CheckboxTile value="1" label="Bear" />
        <CheckboxTile value="2" label="Koala" />
        <CheckboxTile value="3" label="Wolf" />
        <CheckboxTile value="4" label="Horse" />
        <CheckboxTile value="5" label="Chicken" />
        <CheckboxTile value="6" label="Peacock" />
      </CheckboxGroup>
    );
  },
  args: {
    validationText: 'Please pick two.',
    label: 'What are your two favourite animals?',
    helperTextPosition: 'bottom',
  },
};

export const ContentWidth: Story = {
  render: args => {
    return (
      <CheckboxGroup {...args} helperText="Setting the width of the children elements">
        <CheckboxTile value="1" label="One" />
        <CheckboxTile value="2" label="Two" />
        <CheckboxTile value="3" label="Three" />
      </CheckboxGroup>
    );
  },
  args: { contentWidth: '200px' },
};

export const Wrap: Story = {
  render: args => {
    return (
      <Box height="800px" width="350px" padding="200">
        <CheckboxGroup {...args} direction="row" helperText="Child elements will wrap by default">
          <CheckboxTile value="1" label="One" />
          <CheckboxTile value="2" label="Two" />
          <CheckboxTile value="3" label="Three" />
          <CheckboxTile value="4" label="Four" />
          <CheckboxTile value="5" label="Five" />
          <CheckboxTile value="6" label="Six" />
        </CheckboxGroup>
      </Box>
    );
  },
};
