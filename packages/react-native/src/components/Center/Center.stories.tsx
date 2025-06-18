import { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from '.';
import { BodyText } from '../BodyText';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Center',
  component: Center,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: "Hello there, I'm centered!",
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <Center backgroundColor="blue400" padding="200" height={200} width={300}>
      <BodyText>{args.children}</BodyText>
    </Center>
  ),
};
