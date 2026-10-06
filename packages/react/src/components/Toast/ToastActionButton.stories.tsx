import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Toast } from './Toast';
import { ToastActionButton } from './ToastActionButton';
import { ToastProvider } from './ToastProvider';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ToastActionButton> = {
  title: 'Components / Toast / ToastActionButton',
  component: ToastActionButton,
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  args: {
    altText: 'Do Better',
  },
};

export default meta;
type Story = StoryObj<typeof ToastActionButton>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  tags: ['!test'],
  render: args => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
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
        <Toast
          open={open}
          onOpenChange={setOpen}
          icon={<TickCircleMediumIcon />}
          description="Toast description"
        >
          <ToastActionButton {...args}>Button</ToastActionButton>
        </Toast>
      </div>
    );
  },
};
