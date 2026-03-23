/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSavings2 from '@utilitywarehouse/hearth-json-assets/lib/spot-savings-2-light.json';

const meta: Meta = {
  title: 'JSON / SpotSavings2',
};

export default meta;
type Story = StoryObj;

export const SpotSavings2Story: Story = {
  name: 'SpotSavings2',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSavings2} loop={true} />
    </div>
  ),
};
