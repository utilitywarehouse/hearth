import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Accordion } from './Accordion';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';

const meta: Meta<typeof AccordionItem> = {
  title: 'Components / Accordion / AccordionItem',
  component: AccordionItem,
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Playground: Story = {
  tags: ['!test'],
  args: {
    title: 'Item 1',
  },
  render: args => (
    <Box width="600px">
      <Accordion type="multiple" heading="Accordion" helperText="Not the musical one">
        <AccordionItem {...args} value="item-1">
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  ),
};
