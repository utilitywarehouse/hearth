import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Toast } from './Toast';
import { ToastActionLink } from './ToastActionLink';
import { ToastProvider } from './ToastProvider';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components / Toast / ToastProvider',
  component: ToastProvider,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Playground: Story = {
  tags: ['!test'],
  render: args => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);

    return (
      <ToastProvider {...args}>
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
          <ToastActionLink href="#" altText="Visit #">
            Link
          </ToastActionLink>
        </Toast>
      </ToastProvider>
    );
  },
};
