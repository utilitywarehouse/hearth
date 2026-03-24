/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBundle1 from '@utilitywarehouse/hearth-json-assets/lib/spot-bundle-1-light.json';

const meta: Meta = {
  title: 'JSON / SpotBundle1',
};

export default meta;
type Story = StoryObj;

export const SpotBundle1Story: Story = {
  name: 'SpotBundle1',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBundle1} loop={true} />
    </div>
  ),
};
