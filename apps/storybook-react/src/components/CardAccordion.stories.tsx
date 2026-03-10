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
import { useState } from 'react';

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
    const [currentStep, setCurrentStep] = useState<string>('1a');
    const [previousSteps, setPreviousSteps] = useState<Array<string>>([]);

    const getStep = (value: string) => {
      if (currentStep === value) {
        return 'current';
      }
      if (previousSteps.includes(value)) {
        return 'previous';
      }
      return 'future';
    };

    return (
      <Box width="600px">
        <CardAccordion
          {...args}
          value={currentStep}
          onValueChange={(value: string) => console.log({ value })}
        >
          <CardAccordionItem
            value="1a"
            step={getStep('1a')}
            heading="1a. Your home"
            onEditClick={() => {
              setCurrentStep('1a');
              setPreviousSteps([]);
            }}
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
                <CardAccordionButton
                  action="next"
                  onClick={() => {
                    setCurrentStep('1b');
                    setPreviousSteps(['1a']);
                  }}
                />
              </Flex>
            </CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem
            value="1b"
            step={getStep('1b')}
            heading="1b. About your property"
            onEditClick={() => {
              setCurrentStep('1b');
              setPreviousSteps(prev => prev.slice(0, prev.indexOf('1b')));
            }}
          >
            <CardAccordionContent>
              Content 2
              <Flex gap="200">
                <CardAccordionButton
                  action="previous"
                  onClick={() => {
                    setCurrentStep('1a');
                    setPreviousSteps(prev => prev.slice(0, prev.indexOf('1b')));
                  }}
                />
                <CardAccordionButton
                  action="next"
                  onClick={() => {
                    setCurrentStep('1c');
                    setPreviousSteps(prev => [...prev, '1b']);
                  }}
                />
              </Flex>
            </CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem value="1c" step={getStep('1c')} heading="1c. How your home was built">
            <CardAccordionContent>Content 3</CardAccordionContent>
          </CardAccordionItem>
          <CardAccordionItem value="1d" step={getStep('1d')} heading="1d. Use of your home">
            <CardAccordionContent>Content 4</CardAccordionContent>
          </CardAccordionItem>
        </CardAccordion>
      </Box>
    );
  },
};
