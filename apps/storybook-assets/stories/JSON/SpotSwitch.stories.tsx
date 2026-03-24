/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSwitch from '@utilitywarehouse/hearth-json-assets/lib/spot-switch-light.json';

const meta: Meta = {
  title: 'JSON / SpotSwitch',
};

export default meta;
type Story = StoryObj;

export const SpotSwitchStory: Story = {
  name: 'SpotSwitch',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSwitch} loop={true} />
    </div>
  ),
};
