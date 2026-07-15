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
    multiple: { control: { type: 'boolean' } },
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    heading: 'Accordion',
    helperText: 'Not the musical one',
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
  args: { multiple: false },
  render: args => {
    return (
      <Box width="600px">
        <Accordion {...args}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
              <AccordionContent keepMounted>{`Content ${n}`}</AccordionContent>
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
        <Accordion heading="Custom item headers" helperText="Including a badge, for example">
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
    multiple: false,
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
