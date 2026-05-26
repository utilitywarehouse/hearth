import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { CardAccordion } from './CardAccordion';
import { CardAccordionButton } from './CardAccordionButton';
import { CardAccordionFooter } from './CardAccordionFooter';
import { CardAccordionItem } from './CardAccordionItem';

const meta: Meta<typeof CardAccordion> = {
  title: 'Components / CardAccordion',
  component: CardAccordion,
};

export default meta;
type Story = StoryObj<typeof CardAccordion>;

export const Playground: Story = {
  tags: ['!test'],
  render: () => {
    return (
      <Box width="600px">
        <CardAccordion>
          <CardAccordionItem
            value="1a"
            title="1a. Your new cover"
            summaryTitle="1a. Your home"
            summaryDescription={
              <Flex direction="column" gap="50">
                <HelperText>Your type of cover, address & policy start date.</HelperText>
                <BodyText size="lg">31/08/2025</BodyText>
              </Flex>
            }
          >
            <CardAccordionFooter>
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1b"
            title="1b. About your property"
            summaryDescription={
              <HelperText>
                Details about your property type, ownership, and number of rooms.
              </HelperText>
            }
          >
            <Box>Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="next" />
              <CardAccordionButton action="previous" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1c"
            title="1c. How your home was built"
            summaryDescription={
              <HelperText>Summary of your home’s age and construction.</HelperText>
            }
          >
            <Box>Content</Box>
            <CardAccordionFooter>
              <CardAccordionButton action="previous" />
              <CardAccordionButton action="next" />
            </CardAccordionFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1d"
            title="1d. Use of your home"
            summaryDescription={
              <HelperText>
                Details about who lives in your home and how the property is used.
              </HelperText>
            }
          >
            <Box>Content</Box>
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
