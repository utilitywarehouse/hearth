import type { Meta, StoryObj } from '@storybook/react';

import { RadioCard, Flex, RadioGroup, Badge, Box, Heading } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof RadioCard> = {
  title: 'Stories / RadioCard',
  component: RadioCard,
  argTypes: {
    value: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    value: '1',
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const Playground: Story = {
  render: () => {
    return (
      <Flex>
        <RadioGroup
          defaultValue="1"
          direction="column"
          contentWidth="350px"
          label={<Heading>Payment options</Heading>}
        >
          <Flex direction="column">
            <Flex right="24px" position="relative" justifyContent="end">
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
