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
import { useEffect, useState } from 'react';

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
    const [currentStep, setCurrentStep] = useState('1a');
    return (
      <Box width="600px">
        <CardAccordion initialValue="1a" value={currentStep} onValueChange={setCurrentStep}>
          <CardAccordionItem
            value="1a"
            title={`1a. Your ${currentStep === '1a' ? 'new cover' : 'home'}`}
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
          <CardAccordionItem
            value="1b"
            title="1b. About your property"
            previousStepContent={
              <HelperText>
                Details about your property type, ownership, and number of rooms.
              </HelperText>
            }
          >
            <CardAccordionItemContent>Content 2</CardAccordionItemContent>
            <CardAccordionItemFooter>
              <CardAccordionItemButton action="previous" />
              <CardAccordionItemButton action="next" />
            </CardAccordionItemFooter>
          </CardAccordionItem>
          <CardAccordionItem
            value="1c"
            title="1c. How your home was built"
            previousStepContent={
              <HelperText>Summary of your home’s age and construction.</HelperText>
            }
          >
            <CardAccordionItemContent>Content 3</CardAccordionItemContent>
            <CardAccordionItemFooter>
              <CardAccordionItemButton action="previous" />
              <CardAccordionItemButton action="next" />
            </CardAccordionItemFooter>
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
            <CardAccordionItemContent>Content 4</CardAccordionItemContent>
            <CardAccordionItemFooter>
              <CardAccordionItemButton action="previous" />
              <CardAccordionItemButton action="next" />
            </CardAccordionItemFooter>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};
