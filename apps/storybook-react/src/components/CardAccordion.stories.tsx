import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CardAccordion,
  CardAccordionItem,
  CardAccordionContent,
  CardAccordionButton,
  BodyText,
  Flex,
  Box,
  HelperText,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof CardAccordion> = {
  title: 'Stories / CardAccordion',
  component: CardAccordion,
  argTypes: {
    collapsible: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    collapsible: false,
  },
};

export default meta;
type Story = StoryObj<typeof CardAccordion>;

export const Playground: Story = {
  render: args => {
    return (
      <Box width="600px">
        <CardAccordion {...args} initialValue="1a">
          <CardAccordionItem
            value="1a"
            heading="1a. Your home"
            previousStepContent={
              <Flex direction="column" gap="50">
                <HelperText>Your type of cover, address & policy start date.</HelperText>
                <BodyText size="lg">31/08/2025</BodyText>
              </Flex>
            }
          >
            <CardAccordionContent>
              Content 1
              <Flex gap="200">
                <CardAccordionButton action="previous" />
                <CardAccordionButton action="next" />
              </Flex>
            </CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem value="1b" heading="1b. About your property">
            <CardAccordionContent>Content 2</CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem value="1c" heading="1c. How your home was built">
            <CardAccordionContent>Content 3</CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem value="1d" heading="1d. Use of your home">
            <CardAccordionContent>Content 4</CardAccordionContent>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};
