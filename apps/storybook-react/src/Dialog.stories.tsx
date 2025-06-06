import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  Flex,
  Button,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Dialog> = {
  title: 'Stories / Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: '`Dialog`',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: args => (
    <Flex>
      <DialogRoot>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <Dialog {...args}></Dialog>
      </DialogRoot>
    </Flex>
  ),
  args: {
    heading: 'Heading',
    description: 'Description',
  },
};
