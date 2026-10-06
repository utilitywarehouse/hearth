import { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { expect, within } from 'storybook/test';
import { BodyText } from '../BodyText';
import { CardAccordion, CardAccordionButton, CardAccordionFooter, CardAccordionItem } from '.';

const meta = {
  title: 'Stories / CardAccordionFooter',
  component: CardAccordionFooter,
} satisfies Meta<typeof CardAccordionFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <View style={{ width: '100%', maxWidth: 600 }}>
      <CardAccordion defaultValue="2">
        <CardAccordionItem value="1" title="Step 1" />
        <CardAccordionItem value="2" title="Step 2">
          <BodyText>Step 2 content</BodyText>
          <CardAccordionFooter testID="footer" {...args}>
            <CardAccordionButton action="next" />
            <CardAccordionButton action="previous">Back</CardAccordionButton>
          </CardAccordionFooter>
        </CardAccordionItem>
      </CardAccordion>
    </View>
  ),
  play: async ({ canvasElement }) => {
    const footer = within(within(canvasElement).getByTestId('footer'));

    // Previous is placed first in reading order even though it's written second.
    const labels = footer.getAllByRole('button').map(button => button.textContent);
    expect(labels).toEqual(['Back', 'Next']);
  },
};
