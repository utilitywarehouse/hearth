import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CardAccordion,
  CardAccordionItem,
  CardAccordionFooter,
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
  render: () => {
    return (
      <Box width="600px">
        <CardAccordion>
          <CardAccordionItem
            value="1a"
            title="1a. Your new cover"
            previousStepTitle="1a. Your home"
            previousStepContent={
              <Flex direction="column" gap="50">
                <HelperText>Your type of cover, address & policy start date.</HelperText>
                <BodyText size="lg">31/08/2025</BodyText>
              </Flex>
            }
          >
            <Box height="300px">Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1b"
            title="1b. About your property"
            previousStepContent={
              <HelperText>
                Details about your property type, ownership, and number of rooms.
              </HelperText>
            }
          >
            <Box height="300px">Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1c"
            title="1c. How your home was built"
            previousStepContent={
              <HelperText>Summary of your home’s age and construction.</HelperText>
            }
          >
            <Box height="300px">Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1d"
            title="1d. Use of your home"
            previousStepContent={
              <HelperText>
                Details about who lives in your home and how the property is used.
              </HelperText>
            }
          >
            <Box height="300px">Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};
