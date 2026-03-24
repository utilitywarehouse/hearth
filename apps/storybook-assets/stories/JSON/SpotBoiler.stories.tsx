/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBoiler from '@utilitywarehouse/hearth-json-assets/lib/spot-boiler-light.json';

const meta: Meta = {
  title: 'JSON / SpotBoiler',
};

export default meta;
type Story = StoryObj;

export const SpotBoilerStory: Story = {
  name: 'SpotBoiler',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBoiler} loop={true} />
    </div>
  ),
};
