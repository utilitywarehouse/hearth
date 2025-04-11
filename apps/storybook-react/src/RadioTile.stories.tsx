import type { Meta, StoryObj } from '@storybook/react';

import { RadioTile, Flex, RadioGroup } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof RadioTile> = {
  title: 'Stories / RadioTile',
  component: RadioTile,
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    value: '1',
    disabled: false,
    label: 'Label',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof RadioTile>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex gap="500" direction="column">
        <RadioGroup value="2" label="Unchecked radio">
          <RadioTile {...args} />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Checked radio">
          <RadioTile {...args} />
        </RadioGroup>

        <RadioGroup value="2" label="Disabled unchecked radio">
          <RadioTile {...args} disabled />
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Disabled checked radio">
          <RadioTile {...args} disabled />
        </RadioGroup>
      </Flex>
    );
  },
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    value: '1',
    disabled: false,
    label: 'Radio label',
    helperText: 'Radio helper text',
  },
};

export const RadioTileStoryWithOneLongLabel: Story = {
  name: 'RadioTile with one long label',
  render: () => {
    return (
      <RadioGroup label="Radio group">
        <RadioTile value="1" label="One" />
        <RadioTile value="2" label="Twit Twoooooooooooooo" />
        <RadioTile value="3" label="Three" />
      </RadioGroup>
    );
  },
};

// export const RadioTileWidth: Story = {
//   render: () => {
//     return (
//       <Flex width={300}>
//         <RadioGroup
//           label="Would you like to keep an existing mobile number for this SIM?"
//           direction="row"
//           contentWidth="100%"
//         >
//           <RadioTile value="yes" label="Yes" />
//           <RadioTile value="no" label="No" />
//         </RadioGroup>
//       </Flex>
//     );
//   },
// };
