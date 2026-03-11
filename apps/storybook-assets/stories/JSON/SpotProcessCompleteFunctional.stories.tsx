/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotProcessCompleteFunctional from '@utilitywarehouse/hearth-json-assets/lib/spot-process-complete-functional.json';

const meta: Meta = {
  title: 'JSON / SpotProcessCompleteFunctional',
};

export default meta;
type Story = StoryObj;

export const SpotProcessCompleteFunctionalStory: Story = {
  name: 'SpotProcessCompleteFunctional',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotProcessCompleteFunctional} loop={true} />
    </div>
  ),
};
