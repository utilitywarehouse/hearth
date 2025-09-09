import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioTile, Flex, RadioGroup } from '@utilitywarehouse/hearth-react';
import { CashbackCardMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof RadioTile> = {
  title: 'Stories / RadioTile',
  component: RadioTile,
  parameters: {
    docs: {
      description: {
        component:
          '`RadioTile` can be used to choose between a set of more than two options. `RadioTile` should be used with `RadioGroup` to handle the state control and layout.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    value: '1',
    label: 'Label',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof RadioTile>;

export const Playground: Story = {
  render: args => {
    const MyImage = () => <img src="https://help.uw.co.uk/images/iPhone.svg" width={25} />;
    return (
      <Flex gap="500" direction="column">
        <RadioGroup value="2" label="Unchecked radio">
          <RadioTile {...args} />
        </RadioGroup>

        <RadioGroup value="5" label="With icon">
          <RadioTile {...args} image={CashbackCardMediumIcon}/>
        </RadioGroup>

        <RadioGroup value="5" label="With image">
          <RadioTile {...args} image={MyImage}/>
        </RadioGroup>

        <RadioGroup defaultValue={args.value} label="Checked radio">
          <RadioTile {...args} />
        </RadioGroup>
      </Flex>
    );
  },
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    value: '1',
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
