import type { Meta, StoryObj } from '@storybook/react';
import {
  SelectableCard,
  Flex,
  Box,
  Radio,
  RadioGroup,
  Badge,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof SelectableCard> = {
  title: 'Stories / SelectableCard',
  component: SelectableCard,
  parameters: {
    docs: {
      description: {
        component:
          'Links are used to navigate a user to another page or website, another place on the same page, or to open a link in a new tab.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    selected: { control: { type: 'boolean' } },
    borderRadius: { control: { type: 'radio' }, options: ['md', 'xl'] },
    compact: { control: { type: 'boolean' } },
  },
  args: {
    children:
      'Agnes Bernice Martin was an American abstract painter known for her minimalist style.',
    selected: false,
    compact: false,
  },
};

export default meta;
type Story = StoryObj<typeof SelectableCard>;

export const Playground: Story = {};

export const SelectRadioExample: Story = {
  render: () => {
    return (
      <Flex paddingTop="400">
        <RadioGroup defaultValue="1" direction="column" contentWidth="350px">
          <SelectableCard gap="150" direction="column" position="relative">
            <Radio value="1" label="Debit card payment" />
            <Flex position="absolute" justify="end" top="-22px" right="24px">
              <Badge flatBase colorScheme="green">
                Recommended
              </Badge>
            </Flex>
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
          </SelectableCard>

          <SelectableCard gap="150" direction="column">
            <Radio value="2" label="Instant bank transfer" />
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
          </SelectableCard>
        </RadioGroup>
      </Flex>
    );
  },
};
