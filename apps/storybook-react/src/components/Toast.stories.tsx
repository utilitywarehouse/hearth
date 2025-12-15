import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Toast,
  ToastProvider,
  ToastViewport,
  ToastDescription,
  ToastAction,
  ToastClose,
  Flex,
  InlineLink,
  UnstyledIconButton,
  ProviderlessToast,
} from '@utilitywarehouse/hearth-react';
import {
  InfoMediumIcon,
  TickCircleMediumIcon,
  CloseMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

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
      <ToastProvider duration={6000} swipeDirection="down">
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Custom args type for the Playground story
type PlaygroundArgs = {
  message: string;
  showIcon: boolean;
  showCloseButton: boolean;
  showAction: boolean;
  actionText: string;
  duration: number;
  type: 'foreground' | 'background';
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    message: 'Payment method updated',
    showIcon: true,
    showCloseButton: true,
    showAction: false,
    actionText: 'Undo',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show an icon in the toast',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show a close button',
    },
    showAction: {
      control: { type: 'boolean' },
      description: 'Whether to show an action link',
    },
    actionText: {
      control: { type: 'text' },
      description: 'Text for the action link',
      if: { arg: 'showAction', truthy: true },
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
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
      <div style={{ minHeight: '400px', position: 'relative' }}>
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
        <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
          <ToastDescription>
            {args.showIcon && <TickCircleMediumIcon />}
            {args.message}
          </ToastDescription>
          {args.showAction && (
            <ToastAction altText="Action">
              <InlineLink href="#" color="inverted">
                {args.actionText}
              </InlineLink>
            </ToastAction>
          )}
          {args.showCloseButton && (
            <ToastClose>
              <UnstyledIconButton label="Close" inverted>
                <CloseMediumIcon />
              </UnstyledIconButton>
            </ToastClose>
          )}
        </Toast>
      </div>
    );
  },
};

export const WithAction: StoryObj<{
  message: string;
  actionText: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message: 'Toast description',
    actionText: 'Link',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    actionText: {
      control: { type: 'text' },
      description: 'Text for the action link',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast with Action
        </Button>
        <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
          <ToastDescription>
            <InfoMediumIcon />
            {args.message}
          </ToastDescription>
          <ToastAction altText="Go to link">
            <InlineLink href="#" color="inverted">
              {args.actionText}
            </InlineLink>
          </ToastAction>
        </Toast>
      </div>
    );
  },
};

export const WithActionAndDismiss: StoryObj<{
  message: string;
  actionText: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message: 'Toast description',
    actionText: 'Link',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    actionText: {
      control: { type: 'text' },
      description: 'Text for the action link',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast with Action and Dismiss
        </Button>
        <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
          <ToastDescription>
            <InfoMediumIcon />
            {args.message}
          </ToastDescription>
          <ToastAction altText="Go to link">
            <InlineLink href="#" color="inverted">
              {args.actionText}
            </InlineLink>
          </ToastAction>
          <ToastClose>
            <UnstyledIconButton label="Close" inverted>
              <CloseMediumIcon />
            </UnstyledIconButton>
          </ToastClose>
        </Toast>
      </div>
    );
  },
};

export const WithoutIcon: StoryObj<{
  message: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message: 'Payment method updated',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast without Icon
        </Button>
        <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
          <ToastDescription>{args.message}</ToastDescription>
          <ToastClose>
            <UnstyledIconButton label="Close" inverted>
              <CloseMediumIcon />
            </UnstyledIconButton>
          </ToastClose>
        </Toast>
      </div>
    );
  },
};

export const CustomDuration: StoryObj<{
  message: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message: 'This toast will remain visible for the custom duration',
    duration: 10000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast ({args.duration / 1000}s duration)
        </Button>
        <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
          <ToastDescription>
            <InfoMediumIcon />
            {args.message}
          </ToastDescription>
        </Toast>
      </div>
    );
  },
};

export const StackingToasts: StoryObj<{
  message1: string;
  message2: string;
  message3: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message1: 'Email address updated',
    message2: 'Phone number updated',
    message3: 'Payment method updated',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message1: {
      control: { type: 'text' },
      description: 'First toast message',
    },
    message2: {
      control: { type: 'text' },
      description: 'Second toast message',
    },
    message3: {
      control: { type: 'text' },
      description: 'Third toast message',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [toasts, setToasts] = React.useState<number[]>([]);
    const countRef = React.useRef(0);
    const messages = [args.message1, args.message2, args.message3];

    const addToast = () => {
      const id = countRef.current++;
      setToasts(prev => [...prev, id]);
    };

    const removeToast = (id: number) => {
      setToasts(prev => prev.filter(toastId => toastId !== id));
    };

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button onClick={addToast}>Add Toast (stacks vertically)</Button>
        {toasts.map(id => (
          <Toast
            key={id}
            open={true}
            onOpenChange={open => !open && removeToast(id)}
            duration={args.duration}
            type={args.type}
          >
            <ToastDescription>
              <TickCircleMediumIcon />
              {messages[id % messages.length]}
            </ToastDescription>
            <ToastClose>
              <UnstyledIconButton label="Close" inverted>
                <CloseMediumIcon />
              </UnstyledIconButton>
            </ToastClose>
          </Toast>
        ))}
      </div>
    );
  },
};

export const InteractiveExample: StoryObj<{
  saveMessage: string;
  undoMessage: string;
  actionText: string;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    saveMessage: 'Settings updated successfully',
    undoMessage: 'Changes reverted',
    actionText: 'Undo',
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    saveMessage: {
      control: { type: 'text' },
      description: 'Success toast message',
    },
    undoMessage: {
      control: { type: 'text' },
      description: 'Undo toast message',
    },
    actionText: {
      control: { type: 'text' },
      description: 'Text for the action link',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const [undoOpen, setUndoOpen] = React.useState(false);
    const timerRef = React.useRef(0);
    const undoTimerRef = React.useRef(0);

    React.useEffect(() => {
      return () => {
        clearTimeout(timerRef.current);
        clearTimeout(undoTimerRef.current);
      };
    }, []);

    const handleSave = () => {
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    };

    const handleUndo = () => {
      setOpen(false);
      setUndoOpen(false);
      window.clearTimeout(undoTimerRef.current);
      undoTimerRef.current = window.setTimeout(() => {
        setUndoOpen(true);
      }, 100);
    };

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Flex direction="column" gap="200">
          <Button onClick={handleSave}>Update Settings</Button>
          <Toast open={open} onOpenChange={setOpen} duration={args.duration} type={args.type}>
            <ToastDescription>
              <TickCircleMediumIcon />
              {args.saveMessage}
            </ToastDescription>
            <ToastAction altText="Undo changes" onClick={handleUndo}>
              <InlineLink href="#" color="inverted">
                {args.actionText}
              </InlineLink>
            </ToastAction>
            <ToastClose>
              <UnstyledIconButton label="Close" inverted>
                <CloseMediumIcon />
              </UnstyledIconButton>
            </ToastClose>
          </Toast>
          <Toast
            open={undoOpen}
            onOpenChange={setUndoOpen}
            duration={args.duration}
            type={args.type}
          >
            <ToastDescription>
              <InfoMediumIcon />
              {args.undoMessage}
            </ToastDescription>
          </Toast>
        </Flex>
      </div>
    );
  },
};

export const ProviderlessExample: StoryObj<{
  message: string;
  showCloseButton: boolean;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  parameters: {
    docs: {
      description: {
        story:
          "A simplified Toast component that manages its own provider. Use this when you only need a single toast and don't want to set up the provider yourself.",
      },
    },
  },
  args: {
    message: 'Payment method updated',
    showCloseButton: true,
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show a close button',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Providerless Toast
        </Button>
        <ProviderlessToast
          isOpen={open}
          onIsOpenChange={setOpen}
          duration={args.duration}
          type={args.type}
          closeButton={
            args.showCloseButton ? (
              <UnstyledIconButton label="Close" inverted>
                <CloseMediumIcon />
              </UnstyledIconButton>
            ) : undefined
          }
        >
          <TickCircleMediumIcon />
          {args.message}
        </ProviderlessToast>
      </div>
    );
  },
};

export const ProviderlessWithAction: StoryObj<{
  message: string;
  actionText: string;
  showCloseButton: boolean;
  duration: number;
  type: 'foreground' | 'background';
}> = {
  args: {
    message: 'Settings updated successfully',
    actionText: 'Undo',
    showCloseButton: true,
    duration: 6000,
    type: 'foreground',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The toast message content',
    },
    actionText: {
      control: { type: 'text' },
      description: 'Text for the action link',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show a close button',
    },
    duration: {
      control: { type: 'number' },
      description: 'Time in milliseconds before toast auto-dismisses',
    },
    type: {
      control: { type: 'select' },
      options: ['foreground', 'background'],
      description: 'Control sensitivity of toast for accessibility',
    },
  },
  render: args => {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Button
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen(true);
            }, 100);
          }}
        >
          Show Toast with Action
        </Button>
        <ProviderlessToast
          isOpen={open}
          onIsOpenChange={setOpen}
          duration={args.duration}
          type={args.type}
          action={
            <InlineLink href="#" color="inverted">
              {args.actionText}
            </InlineLink>
          }
          closeButton={
            args.showCloseButton ? (
              <UnstyledIconButton label="Close" inverted>
                <CloseMediumIcon />
              </UnstyledIconButton>
            ) : undefined
          }
        >
          <TickCircleMediumIcon />
          {args.message}
        </ProviderlessToast>
      </div>
    );
  },
};
