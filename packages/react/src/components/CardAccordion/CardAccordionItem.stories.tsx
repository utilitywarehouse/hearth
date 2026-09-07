import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { CardAccordion } from './CardAccordion';
import { CardAccordionButton } from './CardAccordionButton';
import { CardAccordionFooter } from './CardAccordionFooter';
import { CardAccordionItem } from './CardAccordionItem';

const meta: Meta<typeof CardAccordionItem> = {
  title: 'Components / CardAccordion / CardAccordionItem',
  component: CardAccordionItem,
};

export default meta;
type Story = StoryObj<typeof CardAccordionItem>;

export const Playground: Story = {
  tags: ['!test'],
  args: {
    value: '1a',
    title: '1a. Your new cover',
  },
  render: args => (
    <Box width="600px">
      <CardAccordion>
        <CardAccordionItem {...args}>
          <CardAccordionFooter>
            <CardAccordionButton action="next" />
          </CardAccordionFooter>
        </CardAccordionItem>
      </CardAccordion>
    </Box>
  ),
};
