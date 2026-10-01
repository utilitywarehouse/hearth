import { Meta, StoryObj } from '@storybook/react-vite';
import ProgressStepperText from './ProgressStepperText';

const meta: Meta<typeof ProgressStepperText> = {
  title: 'Stories / ProgressStepperText',
  component: ProgressStepperText,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStepperText>;

export const Playground: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
  },
};
