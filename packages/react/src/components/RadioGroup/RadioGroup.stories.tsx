import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from '../Box/Box';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { Radio } from '../Radio/Radio';
import { RadioTile } from '../RadioTile/RadioTile';
import { RadioGroup } from './RadioGroup';
import { Flex } from '../Flex/Flex';
import { ThumbsUpSmallIcon, ThumbsDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components / RadioGroup',
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
    validationPlacement: { options: ['top', 'bottom'], control: { type: 'radio' } },
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
  args: {
    name: 'where-do-you-live',
    label: 'Where do you live?',
    helperText: undefined,
    validationText: undefined,
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <Flex direction="row" gap="200">
          <RadioGroup {...args}>
            <RadioTile value="england" label="England" />
            <RadioTile value="wales" label="Wales" />
            <RadioTile value="scotland" label="Scotland" />
            <RadioTile value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
          <RadioGroup {...args}>
            <Radio value="england" label="England" />
            <Radio value="wales" label="Wales" />
            <Radio value="scotland" label="Scotland" />
            <Radio value="northern-ireland" label="Northern Ireland" />
          </RadioGroup>
        </Flex>
        <RadioGroup
          {...args}
          label="Do you like living here?"
          name="do-you-like-living-here"
          direction="row"
        >
          <RadioTile value="y" label="Yes" image={<ThumbsUpSmallIcon />} />
          <RadioTile value="n" label="No" image={<ThumbsDownSmallIcon />} />
        </RadioGroup>
      </Flex>
    );
  },
};

export const RadioHelperText: Story = {
  name: 'Radio HelperText',
  args: {
    defaultValue: '3',
    helperText: undefined,
    name: 'helper-text',
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <RadioGroup {...args}>
        <RadioTile value="1" label="One" helperText="One helper text" />
        <RadioTile value="2" label="Two" helperText="Two helper text" />
        <RadioTile value="3" label="Three" helperText="Three helper text" />
      </RadioGroup>
    );
  },
};

export const ContentWidth: Story = {
  name: 'Content Width',
  args: { contentWidth: '200px', name: 'content-width' },
  render: args => {
    return (
      <RadioGroup {...args} helperText="Setting the width of the children elements">
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

export const ResponsiveDirection: Story = {
  args: { name: 'responsive-direction', direction: { mobile: 'column', tablet: 'row' } },
  render: args => {
    return (
      <RadioGroup
        {...args}
        helperText="Changing the direction of the children elements responsively"
      >
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Two" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  args: {
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
    contentWidth: 'fit-content',
  },
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
};

export const Validation: Story = {
  args: {
    validationText: 'Please tell us what your favourite animal is.',
    label: 'What is your favourite animal?',
    name: 'favourite-animal',
    helperText: 'These are the best animals.',
    contentWidth: 'fit-content',
  },
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
};

export const ValidationPlacement: Story = {
  name: 'Validation placement',
  render: () => (
    <Flex direction="column" gap="400">
      <RadioGroup
        label="Validation top (default)"
        validationStatus="invalid"
        validationText="Please select an option"
        validationPlacement="top"
        name="validation-placement-top"
        contentWidth="fit-content"
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
      </RadioGroup>
      <RadioGroup
        label="Validation bottom"
        validationStatus="invalid"
        validationText="Please select an option"
        validationPlacement="bottom"
        name="validation-placement-bottom"
        contentWidth="fit-content"
      >
        <RadioTile value="1" label="Bear" />
        <RadioTile value="2" label="Koala" />
        <RadioTile value="3" label="Wolf" />
      </RadioGroup>
    </Flex>
  ),
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
  args: {
    label: undefined,
    helperText: undefined,
    validationText: undefined,
    contentWidth: 'fit-content',
  },
  render: args => {
    return (
      <Flex gap="600" direction="column">
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
