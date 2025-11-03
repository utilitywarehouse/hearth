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

export const WithImage: Story = {
  render: (args: ModalArgs) => (
    <ModalRoot>
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
  globals: {
    viewport: { value: 'mobile' },
  },
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
  args: { hideCloseButton: true },
};

export const Loading: Story = {
  render: (args: ModalArgs) => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <Flex justifyContent="center" paddingBlock="200">
          <Spinner />
        </Flex>
        <ModalFooter>
          <ModalClose>
            <Button variant="solid" colorScheme="destructive">
              Cancel
            </Button>
          </ModalClose>
        </ModalFooter>
      </Modal>
    </ModalRoot>
  ),
  args: { heading: 'Your details', description: '' },
};
