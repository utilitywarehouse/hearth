import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CardAccordion,
  CardAccordionItem,
  CardAccordionItemFooter,
  CardAccordionItemContent,
  CardAccordionItemButton,
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
  render: () => {
    return (
      <Box width="600px">
        <CardAccordion initialValue="1a">
          <CardAccordionItem
            value="1a"
            title="1a. Your home"
            previousStepContent={
              <Flex direction="column" gap="50">
                <HelperText>Your type of cover, address & policy start date.</HelperText>
                <BodyText size="lg">31/08/2025</BodyText>
              </Flex>
            }
          >
            <CardAccordionItemContent>Content 1</CardAccordionItemContent>
            <CardAccordionItemFooter>
              <CardAccordionItemButton action="next" />
            </CardAccordionItemFooter>
          </CardAccordionItem>
          <CardAccordionItem value="1b" title="1b. About your property">
            <CardAccordionItemContent>Content 2</CardAccordionItemContent>
            <CardAccordionItemFooter>
              <CardAccordionItemButton action="previous" />
              <CardAccordionItemButton action="next" />
            </CardAccordionItemFooter>
          </CardAccordionItem>
          <CardAccordionItem value="1c" title="1c. How your home was built">
            <CardAccordionItemContent>Content 3</CardAccordionItemContent>
          </CardAccordionItem>
          <CardAccordionItem value="1d" title="1d. Use of your home">
            <CardAccordionItemContent>Content 4</CardAccordionItemContent>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};
