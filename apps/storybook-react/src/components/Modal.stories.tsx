import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import SpotSavings from '../assets/spot-savings.svg';
import {
  Button,
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalClose,
  ModalFooter,
  ModalContent,
  BodyText,
  Card,
  List,
  ListItem,
  ListItemContent,
  Combobox,
} from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Modal> = {
  title: 'Stories / Modal',
  component: Modal,
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

export const Playground: Story = {
  render: args => (
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

export const WithCombobox: Story = {
  render: args => {
    const fruits = ['Apple', 'Banana', 'Orange'];
    return (
      <ModalRoot>
        <ModalTrigger>
          <Button>Open modal</Button>
        </ModalTrigger>
        <Modal {...args}>
          <Combobox label="Combobox" items={fruits} />
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
    );
  },
};

export const DefaultOpen: Story = {
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  args: {
    heading: 'Before you go...',
    description: 'Don’t forget, we offer the UK’s cheapest variable energy tariff available. Plus:',
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
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
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
    a11y: { test: 'off' },
  },
  args: {
    heading:
      'Your account with BT is either closed or has no live broadband or home phone services',
    description:
      'BT have told us you don’t have an active service at this address, so we don’t need to let them know you’re switching. We’ll get you up and running with UW broadband as fast as we can.',
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
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

export const WithoutDescription: Story = {
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
    a11y: { test: 'off' },
  },
  args: {
    heading:
      'Your account with BT is either closed or has no live broadband or home phone services',
    description: undefined,
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <BodyText>
          BT have told us you don’t have an active service at this address, so we don’t need to let
          them know you’re switching. We’ll get you up and running with UW broadband as fast as we
          can.
        </BodyText>
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
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  args: {
    heading:
      'Your account with BT is either closed or has no live broadband or home phone services',
    description:
      'BT have told us you don’t have an active service at this address, so we don’t need to let them know you’re switching. We’ll get you up and running with UW broadband as fast as we can.',
    hideCloseButton: true,
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
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
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
    a11y: { test: 'off' },
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
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
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
    a11y: { test: 'off' },
  },
  globals: { viewport: { value: 'mobile' } },
  render: args => (
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
  render: args => (
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
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  args: {
    heading: 'Loading modal',
    description: 'This is a loading modal, and the heading and description should not show.',
    loading: true,
    loadingText: 'Loading Text (Deprecated prop, please use loadingHeading instead)',
    loadingHeading: 'Matching your details.',
    loadingDescription:
      "We're checking your details for the best deal. This may take a minute or two.",
    hideCloseButton: true,
  },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args} />
    </ModalRoot>
  ),
};

export const WithCard: Story = {
  render: args => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <Card>Card content</Card>
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

export const WithLongContent: Story = {
  globals: { viewport: { value: 'mobile' } },
  render: (args, context) => (
    <ModalRoot defaultOpen={context.viewMode === 'docs' ? undefined : true}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args} image={<img src={SpotSavings} alt="Savings Pig" />}>
        <ModalContent>
          <List variant="emphasis" colorScheme="neutralStrong">
            {Array.from({ length: 50 }, (_, i) => (
              <ListItem key={i}>
                <ListItemContent heading={`Heading ${i + 1}`} helperText="Description" />
              </ListItem>
            ))}
          </List>
        </ModalContent>
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

export const PreventOutsideDismiss: Story = {
  render: args => (
    <ModalRoot>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal
        {...args}
        onEscapeKeyDown={e => e.preventDefault()}
        onPointerDownOutside={e => e.preventDefault()}
        hideCloseButton
      >
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
