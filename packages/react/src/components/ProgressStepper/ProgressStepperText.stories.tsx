import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressStepperText } from './ProgressStepperText';

const meta: Meta<typeof ProgressStepperText> = {
  title: 'Components / ProgressStepper / ProgressStepperText',
  component: ProgressStepperText,
};

export default meta;
type Story = StoryObj<typeof ProgressStepperText>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    currentStep: 1,
    totalSteps: 4,
  },
};
