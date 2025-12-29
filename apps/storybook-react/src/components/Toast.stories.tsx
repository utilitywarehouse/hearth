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
  parameters: {
    docs: {
      description: {
        component:
          'A `Toast` is a brief, non-intrusive message that appears temporarily to provide feedback on an action or notify users of important information. Toasts automatically dismiss after a set duration or can be dismissed manually.',
      },
    },
  },
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
export const StackingToasts: Story = {
  render: args => {
    const [toasts, setToasts] = React.useState<number[]>([]);
    const countRef = React.useRef(0);
    const toastDescriptions = [
      'Email address updated',
      'Phone number updated',
      'Payment method updated',
    ];

    const addToast = () => {
      const id = countRef.current++;
      setToasts(prev => [...prev, id]);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(toastId => toastId !== id));
    };

    return (
      <div>
        <Button onClick={addToast}>Add Toast</Button>
        {toasts.map(id => (
          <Toast
            key={id}
            open={true}
            onOpenChange={open => !open && removeToast(id)}
            description={toastDescriptions[id % toastDescriptions.length]}
            showDismissButton
          />
        ))}
      </div>
    );
  },
};
