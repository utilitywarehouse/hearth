import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { ProgressStep } from './ProgressStep';
import { ProgressStepButton } from './ProgressStepButton';
import { ProgressStepLink } from './ProgressStepLink';
import { ProgressStepper } from './ProgressStepper';
import { ProgressStepperText } from './ProgressStepperText';
import { useMediaQuery } from '../../hooks/use-media-query';
import { media } from '../../utils/media';
import { useState } from 'react';

const meta: Meta<typeof ProgressStepper> = {
  title: 'Components / ProgressStepper',
  component: ProgressStepper,
  argTypes: {
    hideLabels: {
      control: 'boolean',
      description: 'Whether to hide step labels',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    hideLabels: false,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepper>;

/**
 * Visual matrix of ProgressStepper with plain, link, and button steps —
 * used in docs and Chromatic snapshot testing, not a usage reference.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStep status="complete" label="Customer data" />
          <ProgressStep status="complete" label="Shipping data" />
          <ProgressStep status="active" label="Payment data" />
          <ProgressStep status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
          <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
          <ProgressStepLink status="active" href="#payment-data" label="Payment data" />
          <ProgressStepLink status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepButton
            status="complete"
            onClick={() => console.log('Go to Customer Data')}
            label="Customer data"
          />
          <ProgressStepButton
            status="complete"
            onClick={() => console.log('Go to Shipping Data')}
            label="Shipping data"
          />
          <ProgressStepButton status="active" label="Payment data" />
          <ProgressStepButton status="incomplete" label="Summary" />
        </ProgressStepper>
      </Flex>
    );
  },
};

/** Interactive example — step status updates as you move through with Prev/Next. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    const [currentStep, setCurrentStep] = useState(1);

    const getStatus = (step: number) => {
      if (step === currentStep) return 'active';
      if (step < currentStep) return 'complete';
      return 'incomplete';
    };

    return (
      <Flex direction="column" gap="400">
        <BodyText weight="bold">Step {currentStep + 1} Content</BodyText>
        <ProgressStepper {...args}>
          <ProgressStep status={getStatus(0)} label="Customer data" />
          <ProgressStep status={getStatus(1)} label="Shipping data" />
          <ProgressStep status={getStatus(2)} label="Payment data" />
          <ProgressStep status={getStatus(3)} label="Summary" />
        </ProgressStepper>
        <Flex gap="200">
          <Button
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep > 0) setCurrentStep(s => s - 1);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={currentStep === 3}
            onClick={() => {
              if (currentStep < 3) setCurrentStep(s => s + 1);
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
};

/** Use plain ProgressStep children for steps that aren't interactive. */
export const StaticSteps: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStep status="complete" label="Customer data" />
        <ProgressStep status="complete" label="Shipping data" />
        <ProgressStep status="active" label="Payment data" />
        <ProgressStep status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

/** Use ProgressStepLink children to navigate to a step via an href. */
export const LinkSteps: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
        <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
        <ProgressStepLink status="active" href="#payment-data" label="Payment data" />
        <ProgressStepLink status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

/** Use ProgressStepButton children to navigate to a step via onClick. */
export const ButtonSteps: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <ProgressStepper {...args}>
        <ProgressStepButton
          status="complete"
          onClick={() => console.log('Go to Customer Data')}
          label="Customer data"
        />
        <ProgressStepButton
          status="complete"
          onClick={() => console.log('Go to Shipping Data')}
          label="Shipping data"
        />
        <ProgressStepButton status="active" label="Payment data" />
        <ProgressStepButton status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

/** Set disabled on a ProgressStepLink or ProgressStepButton to prevent navigating to that step. */
export const DisabledSteps: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Flex direction="column" gap="400">
        <ProgressStepper {...args}>
          <ProgressStepLink
            disabled
            status="complete"
            href="#customer-data"
            label="Customer data"
          />
          <ProgressStepLink status="active" href="#shipping-data" label="Shipping data" />
          <ProgressStepLink status="incomplete" href="#payment-data" label="Payment data" />
          <ProgressStepLink disabled status="incomplete" label="Summary" />
        </ProgressStepper>
        <ProgressStepper {...args}>
          <ProgressStepButton
            disabled
            status="complete"
            onClick={() => console.log('Go to Customer Data')}
            label="Customer data"
          />
          <ProgressStepButton
            status="active"
            onClick={() => console.log('Go to Shipping Data')}
            label="Shipping data"
          />
          <ProgressStepButton status="incomplete" label="Payment data" />
          <ProgressStepButton disabled status="incomplete" label="Summary" />
        </ProgressStepper>
      </Flex>
    );
  },
};

/**
 * Use `useMediaQuery` to conditionally render `ProgressStepperText` below
 * the `desktop` breakpoint and the full `ProgressStepper` from `desktop`
 * upwards. Resize the browser window to see it switch.
 */
export const ResponsiveWithMediaQuery: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const isBelowDesktop = useMediaQuery(media.below('desktop'));

    return isBelowDesktop ? (
      <ProgressStepperText currentStep={3} totalSteps={4} />
    ) : (
      <ProgressStepper>
        <ProgressStep status="complete" label="Customer data" />
        <ProgressStep status="complete" label="Shipping data" />
        <ProgressStep status="active" label="Payment data" />
        <ProgressStep status="incomplete" label="Summary" />
      </ProgressStepper>
    );
  },
};

/**
 * Render both `ProgressStepperText` and `ProgressStepper`, using `Box`'s
 * responsive `display` prop to show only one at a time per breakpoint.
 * Resize the browser window to see it switch.
 */
export const ResponsiveWithBoxDisplay: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <>
      <Box display={{ mobile: 'block', desktop: 'none' }}>
        <ProgressStepperText currentStep={3} totalSteps={4} />
      </Box>
      <Box display={{ mobile: 'none', desktop: 'block' }}>
        <ProgressStepper>
          <ProgressStep status="complete" label="Customer data" />
          <ProgressStep status="complete" label="Shipping data" />
          <ProgressStep status="active" label="Payment data" />
          <ProgressStep status="incomplete" label="Summary" />
        </ProgressStepper>
      </Box>
    </>
  ),
};

const onStepClick = fn<(step: string) => void>();
const onStepperFormSubmit = fn<() => void>();

/** Test-only: active steps aren't interactive, disabled steps are inert, and step buttons don't submit forms. */
export const StepInteractivity: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <form
      onSubmit={event => {
        event.preventDefault();
        onStepperFormSubmit();
      }}
    >
      <Flex direction="column" gap="400">
        <ProgressStepper as="nav" aria-label="Link steps">
          <ProgressStepLink status="complete" href="#done" label="Done link" />
          <ProgressStepLink status="active" href="#current" label="Current link" />
          <ProgressStepLink status="incomplete" href="#later" label="Disabled link" disabled />
        </ProgressStepper>
        <ProgressStepper aria-label="Button steps">
          <ProgressStepButton
            status="complete"
            label="Done button"
            onClick={() => onStepClick('done')}
          />
          <ProgressStepButton
            status="active"
            label="Current button"
            onClick={() => onStepClick('current')}
          />
          <ProgressStepButton
            status="incomplete"
            label="Disabled button"
            disabled
            onClick={() => onStepClick('disabled')}
          />
        </ProgressStepper>
      </Flex>
    </form>
  ),
  play: async ({ canvasElement }) => {
    onStepClick.mockClear();
    onStepperFormSubmit.mockClear();
    const canvas = within(canvasElement);
    const links = within(canvas.getByRole('navigation', { name: 'Link steps' }));

    await expect(links.getByRole('link', { name: 'Done link' })).toHaveAttribute('href', '#done');
    await expect(links.queryByRole('link', { name: 'Current link' })).not.toBeInTheDocument();
    await expect(links.getByRole('link', { name: 'Disabled link' })).not.toHaveAttribute('href');
    await expect(links.getByRole('link', { name: 'Disabled link' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );

    await expect(canvas.queryByRole('button', { name: 'Current button' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Disabled button' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Done button' }));
    await expect(onStepClick).toHaveBeenCalledOnce();
    await expect(onStepClick).toHaveBeenCalledWith('done');
    await expect(onStepperFormSubmit).not.toHaveBeenCalled();
    (document.activeElement as HTMLElement | null)?.blur();
  },
};
