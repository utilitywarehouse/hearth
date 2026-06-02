import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Accordion } from './Accordion';
import { AccordionContent } from './AccordionContent';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

const meta: Meta<typeof Accordion> = {
  title: 'Components / Accordion',
  component: Accordion,
  argTypes: {
    type: { control: { type: 'radio' }, options: ['multiple', 'single'] },
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    collapsible: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    type: 'multiple',
    heading: 'Accordion',
    helperText: 'Not the musical one',
    collapsible: false,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const SEOFriendly: Story = {
  args: { type: 'single', collapsible: true },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent forceMount>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const CustomItemHeader: Story = {
  render: () => {
    return (
      <Box width="600px">
        <Accordion
          type="multiple"
          heading="Custom item headers"
          helperText="Including a badge, for example"
        >
          {[1, 2, 3].map(n => (
            <AccordionItem key={n} value={`item-${n}`}>
              <AccordionHeader>
                <AccordionTrigger>
                  <Flex width="100%" alignItems="center" justifyContent="between">
                    <BodyText weight="semibold">Custom Header</BodyText>
                    <Badge size="sm" colorScheme="positive">
                      New
                    </Badge>
                  </Flex>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const DefaultExpanded: Story = {
  args: {
    heading: 'Default expanded items',
    helperText: '',
    defaultValue: ['item-3', 'item-4'],
  },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const Multiple: Story = {
  args: {
    heading: 'Multiple items open at once',
    helperText: '',
  },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const Single: Story = {
  args: {
    heading: 'Only a single item open at once',
    helperText: '',
    type: 'single',
  },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const Collapsible: Story = {
  args: {
    heading: 'Collapse all items',
    helperText: 'For use with single type accordions',
    type: 'single',
    collapsible: true,
  },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};

export const HeadingElement: Story = {
  args: {
    heading: 'Heading element',
    helperText: '',
    headingElement: 'h1',
  },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`} headingElement="h2">
              <AccordionContent>{`Content ${n}`}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  },
};
