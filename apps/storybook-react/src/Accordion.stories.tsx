import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  BodyText,
  AccordionHeader,
  Badge,
  Flex,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Accordion> = {
  title: 'Stories / Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: () => {
    return (
      <Accordion>
        {[1, 2, 3].map(n => (
          <AccordionItem value={`item-${n}`} title={`Item ${n}`} description={`Description ${n}`}>
            <AccordionContent>
              <BodyText>{`Content ${n}`}</BodyText>
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="item-custom">
          <AccordionHeader>
            <AccordionTrigger>
              <Flex width="100%" alignItems="center" justifyContent="between">
                <BodyText>Custom Header</BodyText>
                <Badge size="sm">Badge</Badge>
              </Flex>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <BodyText>Content custom</BodyText>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};
