import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Toast,
  ToastProvider,
  ToastActionLink,
  ToastActionButton,
  Flex,
} from '@utilitywarehouse/hearth-react';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Toast> = {
  title: 'Stories / Toast',
  component: Toast,
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    duration: { control: { type: 'number' } },
    type: { control: { type: 'radio' }, options: ['foreground', 'background'] },
    showDismissButton: { control: { type: 'boolean' } },
  },
  args: {
    duration: 5000,
    description: 'Toast description',
    showDismissButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: args => {
    const [open, setOpen] = React.useState(false);

    // Note: The timer logic below is only needed for Storybook to properly replay
    // the toast animation when clicking the button multiple times. In your app,
    // you can simply use: onClick={() => setOpen(true)}
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen} icon={<TickCircleMediumIcon />} {...args}>
          <ToastActionLink href="#" altText="Visit #">
            Link
          </ToastActionLink>
        </Toast>
      </div>
    );
  },
};

export const ToastStory: Story = {
  name: 'Toast',
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: args => {
    return (
      <div>
        <Toast open={true} icon={<TickCircleMediumIcon />} {...args}>
          <ToastActionLink href="#" altText="Visit #">
            Link
          </ToastActionLink>
        </Toast>
      </div>
    );
  },
};

export const Actions: Story = {
  render: () => {
    const [openLinkActionToast, setOpenLinkActionToast] = React.useState(false);
    const [openButtonActionToast, setOpenButtonActionToast] = React.useState(false);

    const linkActionTimerRef = React.useRef(0);
    const buttonActionTimerRef = React.useRef(0);

    React.useEffect(() => {
      return () => {
        clearTimeout(linkActionTimerRef.current);
        clearTimeout(buttonActionTimerRef.current);
      };
    }, []);

    return (
      <div>
        <Flex gap="400">
          <Button
            onClick={() => {
              setOpenLinkActionToast(false);
              window.clearTimeout(linkActionTimerRef.current);
              linkActionTimerRef.current = window.setTimeout(() => {
                setOpenLinkActionToast(true);
              }, 100);
            }}
          >
            Show Link Action Toast
          </Button>
          <Button
            onClick={() => {
              setOpenButtonActionToast(false);
              window.clearTimeout(buttonActionTimerRef.current);
              buttonActionTimerRef.current = window.setTimeout(() => {
                setOpenButtonActionToast(true);
              }, 100);
            }}
          >
            Show Button Action Toast
          </Button>
        </Flex>
        <Toast
          type="foreground"
          duration={10000}
          description="You can change your details anytime"
          open={openLinkActionToast}
          onOpenChange={setOpenLinkActionToast}
        >
          <ToastActionLink
            href="/account-settings"
            altText="Visit account settings to change your details"
          >
            Account settings
          </ToastActionLink>
        </Toast>
        <Toast
          type="foreground"
          duration={10000}
          description="Settings updated"
          open={openButtonActionToast}
          onOpenChange={setOpenButtonActionToast}
        >
          <ToastActionButton altText="Go to settings to undo">Undo</ToastActionButton>
        </Toast>
      </div>
    );
  },
};

export const DuplicateToasts: Story = {
  render: () => {
    const [savedCount, setSavedCount] = React.useState(0);

    return (
      <div>
        <Button onClick={() => setSavedCount(count => count + 1)}>Save</Button>
        {Array.from({ length: savedCount }).map((_, index) => (
          <Toast key={index} description={`Saved! (${index})`} showDismissButton />
        ))}
      </div>
    );
  },
};
