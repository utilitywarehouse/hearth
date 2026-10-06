import { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText';
import { DescriptionList, DescriptionListItem } from '../DescriptionList';
import { CardAccordion, CardAccordionButton, CardAccordionFooter, CardAccordionItem } from '.';

const meta = {
  title: 'Stories / CardAccordionItem',
  component: CardAccordionItem,
  parameters: {
    // See CardAccordion.stories.tsx — Card variant transitions throw a stray ReanimatedError on web.
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    summaryTitle: { control: 'text' },
    editButtonText: { control: 'text' },
  },
  args: {
    value: 'current',
    title: 'About your property',
    description: 'Property type, ownership and rooms.',
    summaryTitle: 'Your property',
    editButtonText: 'Edit',
  },
} satisfies Meta<typeof CardAccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The same item shown completed, current and upcoming. */
export const Playground: Story = {
  args: {
    onEditPress: fn(),
  },
  parameters: {
    // The press event is passed to `onEditPress`; stop the actions addon serialising it.
    actions: { disable: true },
  },
  render: args => (
    <View style={{ width: '100%', maxWidth: 600 }}>
      <CardAccordion defaultValue="current">
        <CardAccordionItem
          {...args}
          value="previous"
          summaryDescription={
            <DescriptionList>
              <DescriptionListItem heading="Property type" description="Semi-detached house" />
            </DescriptionList>
          }
        >
          <BodyText>Step content</BodyText>
        </CardAccordionItem>
        <CardAccordionItem {...args} value="current">
          <BodyText>Step content</BodyText>
          <CardAccordionFooter>
            <CardAccordionButton action="previous" />
            <CardAccordionButton action="next" />
          </CardAccordionFooter>
        </CardAccordionItem>
        <CardAccordionItem {...args} value="future">
          <BodyText>Step content</BodyText>
        </CardAccordionItem>
      </CardAccordion>
    </View>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Only the current step renders its content.
    expect(canvas.getAllByText('Step content')).toHaveLength(1);
    // The completed step shows its summary title and fires onEditPress when edited.
    await userEvent.click(canvas.getByRole('button', { name: 'Edit Your property' }));
    await expect(args.onEditPress).toHaveBeenCalledOnce();
  },
};
