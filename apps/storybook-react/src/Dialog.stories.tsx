import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  Button,
} from '@utilitywarehouse/hearth-react';
import React from 'react';
import { Placeholder } from './storybook-components/Placeholder';

const meta: Meta<typeof Dialog> = {
  title: 'Stories / Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A `Dialog` overlays content to request a decision or inform users of important information. When users need to interact with the application without navigating to a new page or disrupting their workflow, a `Dialog` creates a floating layer over the current page to gather feedback or display information.',
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
            <Button variant="ghost" colorScheme="grey">
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

export const WithImage: Story = {
  render: args => (
    <DialogRoot>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <Dialog {...args} image={<Placeholder width="280px" height="280px" />}>
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

export const OnMobile: Story = {
  globals: {
    viewport: { value: 'mobile' },
  },
  render: args => (
    <DialogRoot>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <Dialog {...args}>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" colorScheme="grey">
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

export const ControlledUsage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <DialogRoot open={open} onOpenChange={(o: boolean) => setOpen(o)}>
          <Dialog heading="Controlled dialog">
            <DialogFooter>
              <Button variant="ghost" colorScheme="grey" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="solid" colorScheme="yellow" onClick={() => setOpen(false)}>
                Primary
              </Button>
            </DialogFooter>
          </Dialog>
        </DialogRoot>
      </div>
    );
  },
};

export const HideCloseButton: Story = {
  render: args => (
    <DialogRoot>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <Dialog {...args}>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" colorScheme="grey">
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
  args: { hideCloseButton: true },
};
