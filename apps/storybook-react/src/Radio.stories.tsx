import type { Meta, StoryObj } from '@storybook/react';

import { Radio, Flex, RadioGroup } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Radio> = {
  title: 'Stories / Radio',
  component: Radio,
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    validationText: { control: { type: 'text' } },
    invalid: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex gap="500" direction="column">
        <RadioGroup value="2" label="Unchecked radio">
          <Radio {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Checked radio">
          <Radio {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Invalid checked radio">
          <Radio {...args} invalid helperText="" />
        </RadioGroup>

        <RadioGroup value="2" label="Disabled unchecked radio">
          <Radio {...args} disabled />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Disabled checked radio">
          <Radio {...args} disabled />
        </RadioGroup>
      </Flex>
    );
  },
  args: {
    value: '1',
    disabled: false,
    label: 'Radio label',
    helperText: 'Radio helper text',
    validationText: 'Radio validation text',
    invalid: false,
  },
};
