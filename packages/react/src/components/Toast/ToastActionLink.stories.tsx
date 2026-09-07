import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Toast } from './Toast';
import { ToastActionLink } from './ToastActionLink';
import { ToastProvider } from './ToastProvider';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ToastActionLink> = {
  title: 'Components / Toast / ToastActionLink',
  component: ToastActionLink,
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  args: {
    href: '#',
    altText: 'Visit #',
  },
};

export default meta;
type Story = StoryObj<typeof ToastActionLink>;

export const Playground: Story = {
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
          <ToastActionLink {...args}>Link</ToastActionLink>
        </Toast>
      </div>
    );
  },
};
