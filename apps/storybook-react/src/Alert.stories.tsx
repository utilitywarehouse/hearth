import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertIconButton, AlertLink, Flex } from '@utilitywarehouse/hearth-react';
import { useEffect, useState } from 'react';

const colorSchemes = ['info', 'positive', 'danger', 'warning'] as const;

const meta: Meta<typeof Alert> = {
  title: 'Stories / Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'An `Alert` is a visual label or indicator used to convey status or highlight content. Alerts are read-only status indicators or labels and are not interactive.',
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <Alert colorScheme="info" title="Information" text="Learn more about our rates." />
        <Alert colorScheme="positive" title="Success" text="Mobile number updated." />
        <Alert colorScheme="danger" title="Error" text="Email address already exists." />
        <Alert colorScheme="warning" title="Warning" text="Payment details needed." />
      </Flex>
    );
  },
};

export const Playground: Story = {
  argTypes: {
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
  },
  args: {
    colorScheme: 'info',
    title: 'Alert Title',
    text: 'This is an example of alert text which can wrap',
  },
};

export const Dismissable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      if (!visible) {
        timer = setTimeout(() => {
          setVisible(true);
        }, 3000);
      }
      return () => clearTimeout(timer);
    }, [visible]);

    const handleClose = () => {
      setVisible(false);
    };

    if (!visible) return <>Alert closed</>;
    return (
      <Alert
        colorScheme="positive"
        title="Success"
        text="Your email address has been verified successfully."
        onClose={handleClose}
      />
    );
  },
};

export const WithAlertLink: Story = {
  render: () => (
    <Flex direction="column" gap="400" alignItems="start">
      <Alert
        colorScheme="info"
        title="Information"
        text="This alert contains additional information that might be helpful."
      >
        <AlertLink href="#example">Learn more</AlertLink>
      </Alert>
      <Alert
        colorScheme="warning"
        title="Warning"
        text="This is a warning message with just an icon link."
      >
        <AlertLink href="#action" />
      </Alert>
    </Flex>
  ),
};

export const WithAlertButton: Story = {
  render: () => (
    <Flex direction="column" gap="400" alignItems="start">
      <Alert
        colorScheme="info"
        title="Clickable Alert"
        text="This entire alert is clickable because it contains an AlertButton."
      >
        <AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />
      </Alert>
      <Alert
        colorScheme="positive"
        title="Custom Button Text"
        text="This alert has a button and a close button."
        onClose={() => alert('Closed')}
      >
        <AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />
      </Alert>
    </Flex>
  ),
};

export const StaticAlert: Story = {
  render: () => (
    <Alert colorScheme="info" title="Static Alert">
      This alert is completely static with no interactive elements.
    </Alert>
  ),
};
