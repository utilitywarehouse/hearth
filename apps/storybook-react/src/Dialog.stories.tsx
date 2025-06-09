import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogFooter,
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
  args: {
    heading: 'Heading',
    description: 'Description',
    hideCloseButton: false,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: args => (
    <DialogRoot>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <Dialog {...args}>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" colorScheme="grey">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="solid" colorScheme="yellow">
              Primary
            </Button>
          </DialogClose>
        </DialogFooter>
      </Dialog>
    </DialogRoot>
  ),
};
