import { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '.';
import { BodyText } from '../../components';

const meta = {
  title: 'Stories / Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether the accordion can be collapsed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The type of accordion',
    },
    noPadding: {
      control: 'boolean',
      description: 'Whether the accordion has no horizontal padding',
    },
    contentNoPadding: {
      control: 'boolean',
      description: 'Whether the accordion content has no padding',
    },
  },
  args: {
    collapsible: true,
    disabled: false,
    type: 'multiple',
    noPadding: false,
    contentNoPadding: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    return (
      <Accordion {...args}>
        <AccordionItem title="How do I place an order?">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }: { isExpanded: boolean }) => {
                return (
                  <>
                    <AccordionTitleText>How do I place an order?</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpSmallIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownSmallIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }: { isExpanded: boolean }) => {
                return (
                  <>
                    <AccordionTitleText>What payment methods do you accept?</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpSmallIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownSmallIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              We accept all major credit cards, PayPal, and bank transfers.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="What is your return policy?">
          <BodyText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, voluptatibus.
          </BodyText>
        </AccordionItem>
      </Accordion>
    );
  },
};
