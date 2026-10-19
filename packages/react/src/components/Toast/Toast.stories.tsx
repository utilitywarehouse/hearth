import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect } from 'react';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Toast } from './Toast';
import { ToastActionButton } from './ToastActionButton';
import { ToastActionLink } from './ToastActionLink';
import { ToastProvider } from './ToastProvider';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Toast> = {
  title: 'Components / Toast',
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Show Toast' }));
    const toast = (await screen.findByText('Toast description')).closest('li')!;

    await userEvent.click(within(toast).getByRole('button', { name: 'Dismiss toast' }));
    await waitFor(() => expect(screen.queryByText('Toast description')).not.toBeInTheDocument());
  },
  render: args => {
    const [open, setOpen] = useState(false);

    // Note: The timer logic below is only needed for Storybook to properly replay
    // the toast animation when clicking the button multiple times. In your app,
    // you can simply use: onClick={() => setOpen(true)}
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
        <Toast open={open} onOpenChange={setOpen} icon={<TickCircleMediumIcon />} {...args}>
          <ToastActionLink href="#" altText="Visit #">
            Link
          </ToastActionLink>
        </Toast>
      </div>
    );
  },
};

/** Default appearance of a Toast, shown open with an icon and an action link. */
export const ToastStory: Story = {
  name: 'Toast',
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Use ToastActionLink or ToastActionButton to give the user something to do from the toast. */
export const Actions: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Show Button Action Toast' })
    );
    const undo = await screen.findByRole('button', { name: 'Undo' });

    await expect(undo).toHaveAttribute('type', 'button');

    await userEvent.click(undo);
    await waitFor(() => expect(screen.queryByText('Settings updated')).not.toBeInTheDocument());
  },
  render: () => {
    const [openLinkActionToast, setOpenLinkActionToast] = useState(false);
    const [openButtonActionToast, setOpenButtonActionToast] = useState(false);

    const linkActionTimerRef = useRef(0);
    const buttonActionTimerRef = useRef(0);

    useEffect(() => {
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

/** Multiple Toasts triggered in succession stack and dismiss independently. */
export const DuplicateToasts: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const save = within(canvasElement).getByRole('button', { name: 'Save' });
    await userEvent.click(save);
    await userEvent.click(save);
    const first = (await screen.findByText('Saved! (0)')).closest('li')!;
    await screen.findByText('Saved! (1)');

    await userEvent.click(within(first).getByRole('button', { name: 'Dismiss toast' }));
    await waitFor(() => expect(screen.queryByText('Saved! (0)')).not.toBeInTheDocument());
    await expect(screen.getByText('Saved! (1)')).toBeInTheDocument();
  },
  render: () => {
    const [savedCount, setSavedCount] = useState(0);

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

/** Test-only: viewport props passed to ToastProvider reach the toast viewport. */
export const ProviderViewportProps: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <ToastProvider className="custom-viewport" data-viewport-test="">
      <Toast open description="Viewport toast" />
    </ToastProvider>
  ),
  play: async () => {
    const toast = await screen.findByText('Viewport toast');
    const viewport = toast.closest('ol')!;

    await expect(viewport).toHaveClass('h-ToastViewport', 'custom-viewport');
    await expect(viewport).toHaveAttribute('data-viewport-test');
  },
};
