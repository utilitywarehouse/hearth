/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotError from '@utilitywarehouse/hearth-json-assets/lib/spot-error-light.json';

const meta: Meta = {
  title: 'JSON / SpotError',
};

export default meta;
type Story = StoryObj;

export const SpotErrorStory: Story = {
  name: 'SpotError',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotError} loop={true} />
    </div>
  ),
};
