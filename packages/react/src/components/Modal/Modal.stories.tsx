import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SpotSavings from '../../docs/assets/spot-savings.svg';
import { BodyText } from '../BodyText/BodyText';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Combobox } from '../Combobox/Combobox';
import { InlineLink } from '../InlineLink/InlineLink';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';
import { ListItemContent } from '../List/ListItemContent';
import { Strong } from '../Strong/Strong';
import { Modal } from './Modal';
import { ModalClose } from './ModalClose';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import { ModalRoot } from './ModalRoot';
import { ModalTrigger } from './ModalTrigger';

const meta: Meta<typeof Modal> = {
  title: 'Components / Modal',
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <BodyText>
          BT have told us you don&apos;t have an active service at this address, so we don&apos;t
          need to let them know you&apos;re switching. We&apos;ll get you up and running with UW
          broadband as fast as we can.
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
  tags: ['!test'],
  parameters: {
    chromatic: { delay: 300 },
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
    const [open, setOpen] = useState(false);
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
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
  args: { heading: 'Tariff details', description: undefined, fullScreen: true },
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...args}>
        <ModalContent>
          <BodyText paragraphSpacing size="md">
            <Strong>Cheapest variable energy:</Strong> when you take energy and two other eligible
            bundle services vs standard variable tariffs offered by major suppliers (large and
            medium suppliers as defined by Ofgem), for sale nationally, excl. existing customer
            tariffs. Based on Ofgem&apos;s typical domestic usage. Payment by Direct Debit. Correct
            as of 13/10/2025. Contact us to verify.{' '}
            <InlineLink href="#">See UW terms and conditions.</InlineLink>
          </BodyText>
          <BodyText paragraphSpacing size="md">
            <Strong>UW Price Pledge:</Strong> Eligible new customers (from 22/04/24) who take 3 or
            more qualifying services and regularly use their Cashback Card. If a customer
            doesn&apos;t save with UW (incl. Cashback) in their first year vs their previous
            provider (or cheapest major provider where applicable), they can apply to claim the UW
            Price Pledge between 12 - 15 months after their sign-up date; the pledge & no exit fees
            only applies to qualifying services taken at sign-up. When you claim, we&apos;ll assume
            an average Cashback Card saving of £160 a year (based on customer usage data from
            03.04.23 to 31.03.24, for users who earned Cashback at least at least once a week,
            excluding promotional activities) or your actual Cashback saving if higher. Full
            details, eligibility and terms available <InlineLink href="#">here.</InlineLink>
          </BodyText>
          <BodyText paragraphSpacing size="md">
            <Strong>£400 to help you switch:</Strong> When you take a 3 or 4+ Service Bundle,
            we&apos;ll give you credit up to £400 towards any termination fees (excluding Home
            Insurance) you have to pay your current providers. You&apos;ll need to return any
            equipment and pay for services you used before you cancel. Additional requirements apply
            to customers who are tenants. Further terms apply see our Residential Products and
            Services <InlineLink href="#">terms and conditions.</InlineLink>
          </BodyText>
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

export const WithLongContentAndImage: Story = {
  tags: ['!test'],
  globals: { viewport: { value: 'mobile' } },
  render: (args, { viewMode }: { viewMode?: string }) => (
    <ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
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
