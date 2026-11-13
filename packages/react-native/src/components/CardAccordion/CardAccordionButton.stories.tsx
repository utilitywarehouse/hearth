import { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { BodyText } from '../BodyText';
import { CardAccordion, CardAccordionButton, CardAccordionFooter, CardAccordionItem } from '.';

const meta = {
  title: 'Stories / CardAccordionButton',
  component: CardAccordionButton,
  parameters: {
    // See CardAccordion.stories.tsx — Card variant transitions throw a stray ReanimatedError on web.
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
    // The press event is passed to `onPress`; stop the actions addon serialising it.
    actions: { disable: true },
  },
  argTypes: {
    action: { control: 'select', options: ['next', 'previous'] },
    children: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    action: 'next',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof CardAccordionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    onPress: fn(),
  },
  render: args => (
    <View style={{ width: '100%', maxWidth: 600 }}>
      <CardAccordion defaultValue="2">
        <CardAccordionItem value="1" title="Step 1">
          <BodyText>Step 1 content</BodyText>
        </CardAccordionItem>
        <CardAccordionItem value="2" title="Step 2">
          <BodyText>Step 2 content</BodyText>
          <CardAccordionFooter>
            <CardAccordionButton {...args} />
          </CardAccordionFooter>
        </CardAccordionItem>
        <CardAccordionItem value="3" title="Step 3">
          <BodyText>Step 3 content</BodyText>
        </CardAccordionItem>
      </CardAccordion>
    </View>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(args.onPress).toHaveBeenCalledOnce();
    await waitFor(() => expect(canvas.getByText('Step 3 content')).toBeInTheDocument());
  },
};
