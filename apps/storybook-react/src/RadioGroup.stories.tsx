import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioGroup, RadioTile, Box, Heading, Grid } from '@utilitywarehouse/hearth-react';
import { Flex } from '@utilitywarehouse/hearth-react/src/index.js';

const meta: Meta<typeof RadioGroup> = {
  title: 'Stories / RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          '`RadioGroup` provides an accessible way to group and control a set of `Radio`, `RadioTile` or `RadioCard` components, allowing the user to select one option from a set. The `RadioGroup` is responsible for handling the value, helper text, validation status and text, as well as determining the presentation and selection of the items in the list. Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.',
      },
    },
  },
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
    contentWidth: { control: { type: 'text' } },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    validationText: 'Validation text',
    contentWidth: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <RadioGroup {...args}>
          <RadioTile value="england" label="England" />
          <RadioTile value="wales" label="Wales" />
          <RadioTile value="scotland" label="Scotland" />
          <RadioTile value="northern-ireland" label="Northern Ireland" />
        </RadioGroup>
        <RadioGroup
          {...args}
          label="Do you like living here?"
          name="do-you-like-living-here"
          direction="row"
        >
          <RadioTile value="y" label="Yes" />
          <RadioTile value="n" label="No" />
        </RadioGroup>
      </Flex>
    );
  },
  args: {
    name: 'where-do-you-live',
    label: 'Where do you live?',
    helperText: undefined,
    validationText: undefined,
  },
};

export const RadioHelperText: Story = {
  name: 'Radio HelperText',
  render: args => {
    return (
      <RadioGroup {...args}>
        <RadioTile value="1" label="One" helperText="One helper text" />
        <RadioTile value="2" label="Two" helperText="Two helper text" />
        <RadioTile value="3" label="Three" helperText="Three helper text" />
      </RadioGroup>
    );
  },
  args: {
    defaultValue: '3',
    helperText: undefined,
    name: 'helper-text',
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
  args: { contentWidth: '200px', name: 'content-width' },
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
          <RadioTile key={animal} value={animal} label={animal} />
        ))}
      </RadioGroup>
    );
  },
  args: {
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
  },
};

export const Validation: Story = {
  name: 'Validation',
  render: args => {
    const [selected, setSelected] = useState('');
    return (
      <RadioGroup
        {...args}
        value={selected}
        onValueChange={setSelected}
        validationStatus={selected ? undefined : 'invalid'}
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
        <RadioTile value="4" label="Horse" />
      </RadioGroup>
    );
  },
  args: {
    validationText: 'Please tell us what your favourite animal is.',
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
    helperText: 'These are the best animals.',
  },
};

export const Wrap: Story = {
  render: args => {
    return (
      <Box height="800px" width="350px" padding="200">
        <RadioGroup
          {...args}
          direction="row"
          helperText="Child elements will wrap by default"
          name="wrap"
        >
          <RadioTile value="1" label="One" />
          <RadioTile value="2" label="Two" />
          <RadioTile value="3" label="Three" />
          <RadioTile value="4" label="Four" />
          <RadioTile value="5" label="Five" />
          <RadioTile value="6" label="Six" />
        </RadioGroup>
      </Box>
    );
  },
};

export const CustomLabel: Story = {
  render: args => {
    return (
      <Flex gap="600">
        <Flex width="fit-content">
          <RadioGroup
            {...args}
            label={<Heading as="h2">Where do you live?</Heading>}
            name="where-do-you-live"
          >
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
        </Flex>
        <Flex direction="column" gap="100">
          <Heading as="h2" id="where-do-you-live">
            Where do you live?
          </Heading>
          <RadioGroup {...args} aria-labelledby="where-do-you-live">
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
        </Flex>
      </Flex>
    );
  },
  args: { label: undefined, helperText: undefined, validationText: undefined },
};

export const WithGrid: Story = {
  render: args => {
    return (
      <RadioGroup {...args}>
        <Grid columns="3" gap="150">
          <RadioTile value="1" label="One" />
          <RadioTile value="2" label="Two" />
          <RadioTile value="3" label="Three" />
          <RadioTile value="4" label="Four" />
          <RadioTile value="5" label="Five" />
          <RadioTile value="6" label="Six" />
        </Grid>
      </RadioGroup>
    );
  },
  args: { label: 'Using grid', helperText: undefined, validationText: undefined },
};
