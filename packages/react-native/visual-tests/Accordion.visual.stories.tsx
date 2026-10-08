import type { Meta, StoryObj } from '@storybook/react-native';
import { Accordion, AccordionItem } from '../src/components/Accordion';
import { BodyText } from '../src/components/BodyText';

const meta = {
  title: 'Visual Tests/Accordion',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <Accordion defaultValue={['open']} heading="Heading" helperText="Helper">
      <AccordionItem value="open" title="Expanded">
        <BodyText>Expanded content.</BodyText>
      </AccordionItem>
      <AccordionItem value="closed" title="Collapsed">
        <BodyText>Hidden content.</BodyText>
      </AccordionItem>
      <AccordionItem value="disabled" title="Disabled" disabled>
        <BodyText>Hidden content.</BodyText>
      </AccordionItem>
    </Accordion>
  ),
};
