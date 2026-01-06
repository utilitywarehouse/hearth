import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SpotSavings from '../assets/spot-savings.svg';
import {
  Button,
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalClose,
  ModalFooter,
  Spinner,
  Flex,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Modal> = {
  title: 'Stories / Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'A `Modal` overlays content to request a decision or inform users of important information. When users need to interact with the application without navigating to a new page or disrupting their workflow, a `Modal` creates a floating layer over the current page to gather feedback or display information.',
      },
    },
  },
  argTypes: {},
  args: {
    heading: 'Heading',
    description: 'Description',
    hideCloseButton: false,
    fullScreen: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

type ModalArgs = React.ComponentProps<typeof Modal>;

export const Playground: Story = {
  render: (args: ModalArgs) => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Primary
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const DefaultOpen: Story = {
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: (args: ModalArgs) => (
    <ModalRoot defaultOpen>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Primary
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const WithLongHeading: Story = {
  parameters: { chromatic: { disableSnapshot: false }, delay: 300 },
  args: {
    heading:
      'Your account with BT is either closed or has no live broadband or home phone services',
    description:
      'BT have told us you don’t have an active service at this address, so we don’t need to let them know you’re switching. We’ll get you up and running with UW broadband as fast as we can.',
  },
  render: (args: ModalArgs) => (
    <ModalRoot defaultOpen>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Continue
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const WithLongHeadingAndHideCloseButton: Story = {
  parameters: { chromatic: { disableSnapshot: false }, delay: 300 },
  args: {
    heading:
      'Your account with BT is either closed or has no live broadband or home phone services',
    description:
      'BT have told us you don’t have an active service at this address, so we don’t need to let them know you’re switching. We’ll get you up and running with UW broadband as fast as we can.',
    hideCloseButton: true,
  },
  render: (args: ModalArgs) => (
    <ModalRoot defaultOpen>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Continue
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const WithImage: Story = {
  parameters: { chromatic: { disableSnapshot: false }, delay: 300 },
  render: (args: ModalArgs) => (
    <ModalRoot defaultOpen>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args} image={<img src={SpotSavings} alt="Savings Pig" />}>
        <ModalFooter>
          <ModalClose>
            <Button variant="outline" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Primary
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const OnMobile: Story = {
  parameters: { chromatic: { disableSnapshot: false }, delay: 300 },
  globals: { viewport: { value: 'mobile' } },
  render: (args: ModalArgs) => (
    <ModalRoot defaultOpen>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Primary
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const ControlledUsage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <ModalRoot open={open} onOpenChange={(o: boolean) => setOpen(o)}>
          <Modal heading="Controlled modal">
            <ModalFooter>
              <Button variant="ghost" colorScheme="functional" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="solid" colorScheme="highlight" onClick={() => setOpen(false)}>
                Primary
              </Button>
            </ModalFooter>
          </Modal>
        </ModalRoot>
      </div>
    );
  },
};

export const HideCloseButton: Story = {
  args: { hideCloseButton: true },
  render: (args: ModalArgs) => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalFooter>
          <ModalClose>
            <Button variant="ghost" colorScheme="functional">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose>
            <Button variant="solid" colorScheme="highlight">
              Primary
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};

export const Loading: Story = {
  args: { heading: 'Your details', description: '' },
  render: (args: ModalArgs) => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <Flex justifyContent="center" paddingY="200">
          <Spinner />
        </Flex>
        <ModalFooter>
          <ModalClose>
            <Button variant="outline" colorScheme="destructive">
              Cancel
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
};
