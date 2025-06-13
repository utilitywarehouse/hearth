import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  Button,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Dialog> = {
  title: 'Stories / Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A `Dialog` overlays content to request a decision or inform users of important information. When users need to interact with the application without navigating to a new page or disrupting their workflow, a Dialog creates a floating layer over the current page to gather feedback or display information. A scrim (a semi-transparent background) is used to dim the underlying content, drawing focus to the dialog.',
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
