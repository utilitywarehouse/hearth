import type { Meta, StoryObj } from '@storybook/react';

import { RadioCard, Flex, RadioGroup, Badge, Box } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof RadioCard> = {
  title: 'Stories / RadioCard',
  component: RadioCard,
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
type Story = StoryObj<typeof RadioCard>;

// export const Playground: Story = {
//   render: args => {
//     return (
//       <Flex gap="500" direction="column">
//         <RadioGroup value="2" label="Unchecked radio">
//           <RadioCard {...args} />
//         </RadioGroup>
//
//         <RadioGroup defaultValue={args.value} label="Checked radio">
//           <RadioCard {...args} />
//         </RadioGroup>
//
//         <RadioGroup value="2" label="Disabled unchecked radio">
//           <RadioCard {...args} disabled />
//         </RadioGroup>
//
//         <RadioGroup defaultValue={args.value} label="Disabled checked radio">
//           <RadioCard {...args} disabled />
//         </RadioGroup>
//       </Flex>
//     );
//   },
//   argTypes: {
//     value: { control: { type: 'text' } },
//     helperText: { control: { type: 'text' } },
//     label: { control: { type: 'text' } },
//     disabled: { control: { type: 'boolean' } },
//   },
//   args: {
//     value: '1',
//     disabled: false,
//     label: 'Radio label',
//     helperText: 'Radio helper text',
//   },
// };

export const Playground: Story = {
  render: () => {
    return (
      <Flex>
        <RadioGroup defaultValue="1" direction="column" contentWidth="350px">
          <Flex direction="column">
            <Flex right="24px" position="relative" justify="end">
              <Badge flatBase colorScheme="green">
                Recommended
              </Badge>
            </Flex>

            <RadioCard value="1" label="Debit card payment">
              <Flex asChild gap="100" direction="column">
                <ul role="list">
                  <Box asChild marginLeft="100">
                    <li>• Unlimited free top-ups</li>
                  </Box>
                  <Box asChild marginLeft="100">
                    <li>• Instant withdrawals</li>
                  </Box>
                  <Box asChild marginLeft="100">
                    <li>• Extra layer of security</li>
                  </Box>
                </ul>
              </Flex>
            </RadioCard>
          </Flex>

          <RadioCard value="2" label="Instant bank transfer">
            <Flex asChild gap="100" direction="column">
              <ul role="list">
                <Box asChild marginLeft="100">
                  <li>• 5 free top-ups per month</li>
                </Box>
                <Box asChild marginLeft="100">
                  <li>• £0.35 per additional top-up</li>
                </Box>
              </ul>
            </Flex>
          </RadioCard>
        </RadioGroup>
      </Flex>
    );
  },
};

export const RadioCardStoryWithOneLongLabel: Story = {
  name: 'RadioCard with one long label',
  render: () => {
    return (
      <RadioGroup label="Radio group">
        <RadioCard value="1" label="One" />
        <RadioCard value="2" label="Twit Twoooooooooooooo" />
        <RadioCard value="3" label="Three" />
      </RadioGroup>
    );
  },
};

// export const RadioCardWidth: Story = {
//   render: () => {
//     return (
//       <Flex width={300}>
//         <RadioGroup
//           label="Would you like to keep an existing mobile number for this SIM?"
//           direction="row"
//           contentWidth="100%"
//         >
//           <RadioCard value="yes" label="Yes" />
//           <RadioCard value="no" label="No" />
//         </RadioGroup>
//       </Flex>
//     );
//   },
// };
