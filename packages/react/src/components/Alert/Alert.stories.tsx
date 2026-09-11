import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Grid } from '../Grid/Grid';
import { InlineLink } from '../InlineLink/InlineLink';
import { Strong } from '../Strong/Strong';
import { Alert } from './Alert';
import { AlertIconButton } from './AlertIconButton';
import { AlertLink } from './AlertLink';

const colorSchemes = ['info', 'positive', 'danger', 'warning'] as const;

const meta: Meta<typeof Alert> = {
  title: 'Components / Alert',
  component: Alert,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

/** Visual matrix of Alert colour schemes — used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  argTypes: {
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
  },
  args: {
    colorScheme: 'info',
    title: 'Alert Title',
    text: 'This is an example of alert text which can wrap',
  },
};

/** Set gridColumnSpan to lay Alerts out as children of a Grid. */
export const GridChildren: Story = {
  parameters: { controls: { disable: true }, actions: { disable: true } },
  render: () => {
    return (
      <Grid defaultResponsiveColumns gap="200">
        <Alert
          colorScheme="info"
          title="Information"
          text="Learn more about our rates."
          gridColumnSpan="4"
        />
        <Alert
          colorScheme="positive"
          title="Success"
          text="Mobile number updated."
          gridColumnSpan="4"
        />
        <Alert
          colorScheme="danger"
          title="Error"
          text="Email address already exists."
          gridColumnSpan="4"
        />
        <Alert
          colorScheme="warning"
          title="Warning"
          text="Payment details needed."
          gridColumnSpan="4"
        />
      </Grid>
    );
  },
};

/** Pass onClose to render a close button that dismisses the Alert. */
export const Dismissable: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => {
    return (
      <Alert
        colorScheme="positive"
        title="Success"
        text="Your email address has been verified successfully."
        onClose={() => {}}
      />
    );
  },
};

/** Nest an AlertLink to add a text link, icon-only link, or custom action element inside an Alert. */
export const WithAlertLink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
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
      <Alert
        colorScheme="danger"
        title="Sorry, something went wrong"
        text={
          <>
            If the problem persists, please contact Partner Support on{' '}
            <InlineLink href="tel:+443337778777" style={{ color: 'inherit' }}>
              <Strong>0333&nbsp;7778777</Strong>
            </InlineLink>{' '}
            (Monday to Friday 09:00-17:30, Saturdays 10:00-13:00).
          </>
        }
      >
        <AlertLink asChild>
          <button onClick={() => alert('Custom action')}>Custom action as button</button>
        </AlertLink>
      </Alert>
    </Flex>
  ),
};

/** Nest an AlertIconButton to make the entire Alert clickable in addition to any close button. */
export const WithAlertButton: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
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

/** An Alert with only children and no title/text/actions renders as plain static content. */
export const StaticAlert: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Alert colorScheme="info" title="Static Alert">
      This alert is completely static with no interactive elements.
    </Alert>
  ),
};
