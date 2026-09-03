import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { CardAccordion } from './CardAccordion';
import { CardAccordionButton } from './CardAccordionButton';
import { CardAccordionFooter } from './CardAccordionFooter';
import { CardAccordionItem } from './CardAccordionItem';

const meta: Meta<typeof CardAccordionButton> = {
  title: 'Components / CardAccordion / CardAccordionButton',
  component: CardAccordionButton,
};

export default meta;
type Story = StoryObj<typeof CardAccordionButton>;

export const Playground: Story = {
  tags: ['!test'],
  args: {
    action: 'next',
  },
  render: args => (
    <Box width="600px">
      <CardAccordion>
        <CardAccordionItem value="1a" title="1a. Your new cover">
          <CardAccordionFooter>
            <CardAccordionButton {...args} />
          </CardAccordionFooter>
        </CardAccordionItem>
      </CardAccordion>
    </Box>
  ),
};
