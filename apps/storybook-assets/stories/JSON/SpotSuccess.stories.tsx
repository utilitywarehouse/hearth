/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSuccess from '@utilitywarehouse/hearth-json-assets/lib/spot-success-light.json';

const meta: Meta = {
  title: 'JSON / SpotSuccess',
};

export default meta;
type Story = StoryObj;

export const SpotSuccessStory: Story = {
  name: 'SpotSuccess',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSuccess} loop={true} />
    </div>
  ),
};
