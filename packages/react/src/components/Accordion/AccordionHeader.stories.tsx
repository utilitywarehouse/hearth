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

const meta: Meta<typeof AccordionHeader> = {
  title: 'Components / Accordion / AccordionHeader',
  component: AccordionHeader,
};

export default meta;
type Story = StoryObj<typeof AccordionHeader>;

export const Playground: Story = {
  tags: ['!test'],
  render: () => (
    <Box width="600px">
      <Accordion
        type="multiple"
        heading="Custom item headers"
        helperText="Including a badge, for example"
      >
        <AccordionItem value="item-1">
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
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  ),
};
