/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotNoBroadband from '@utilitywarehouse/hearth-json-assets/lib/spot-no-broadband-light.json';

const meta: Meta = {
  title: 'JSON / SpotNoBroadband',
};

export default meta;
type Story = StoryObj;

export const SpotNoBroadbandStory: Story = {
  name: 'SpotNoBroadband',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotNoBroadband} loop={true} />
    </div>
  ),
};
