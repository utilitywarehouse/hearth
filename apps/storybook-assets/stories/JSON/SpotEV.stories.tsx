/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotEV from '@utilitywarehouse/hearth-json-assets/lib/spot-ev-light.json';

const meta: Meta = {
  title: 'JSON / SpotEV',
};

export default meta;
type Story = StoryObj;

export const SpotEVStory: Story = {
  name: 'SpotEV',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotEV} loop={true} />
    </div>
  ),
};
