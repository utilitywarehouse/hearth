/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBundle2 from '@utilitywarehouse/hearth-json-assets/lib/spot-bundle-2-light.json';

const meta: Meta = {
  title: 'JSON / SpotBundle2',
};

export default meta;
type Story = StoryObj;

export const SpotBundle2Story: Story = {
  name: 'SpotBundle2',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBundle2} loop={true} />
    </div>
  ),
};
