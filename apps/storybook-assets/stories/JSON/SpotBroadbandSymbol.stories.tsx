/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBroadbandSymbol from '@utilitywarehouse/hearth-json-assets/lib/spot-broadband-symbol-light.json';

const meta: Meta = {
  title: 'JSON / SpotBroadbandSymbol',
};

export default meta;
type Story = StoryObj;

export const SpotBroadbandSymbolStory: Story = {
  name: 'SpotBroadbandSymbol',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBroadbandSymbol} loop={true} />
    </div>
  ),
};
