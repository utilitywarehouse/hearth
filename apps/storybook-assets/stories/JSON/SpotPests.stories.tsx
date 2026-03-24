/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotPests from '@utilitywarehouse/hearth-json-assets/lib/spot-pests-light.json';

const meta: Meta = {
  title: 'JSON / SpotPests',
};

export default meta;
type Story = StoryObj;

export const SpotPestsStory: Story = {
  name: 'SpotPests',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotPests} loop={true} />
    </div>
  ),
};
