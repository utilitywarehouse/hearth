import type { Meta, StoryObj } from '@storybook/react';
import { SelectableCard, Flex, BodyText } from '@utilitywarehouse/hearth-react';
import { Radio, RadioGroup } from '@utilitywarehouse/web-ui';

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
  },
  args: {
    children:
      'Agnes Bernice Martin was an American abstract painter known for her minimalist style.',
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof SelectableCard>;

export const Playground: Story = {};

export const SelectRadioExample: Story = {
  render: () => {
    return (
      <RadioGroup defaultValue="1" direction="row" contentWidth="800px">
        <SelectableCard padding="lg" flex="1">
          <Flex direction="row" justify="space-between" width="100%">
            <BodyText size="md">Debit card payment</BodyText>
            <Radio value="1" sx={{ flex: 'none' }} />
          </Flex>
        </SelectableCard>
        <SelectableCard padding="lg" flex="1">
          <Flex direction="row" justify="space-between" width="100%">
            <BodyText size="md">Instant bank transfer</BodyText>
            <Radio value="2" sx={{ flex: 'none' }} />
          </Flex>
        </SelectableCard>
      </RadioGroup>
    );
  },
};
