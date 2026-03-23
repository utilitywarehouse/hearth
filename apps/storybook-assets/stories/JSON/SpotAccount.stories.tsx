/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotAccount from '@utilitywarehouse/hearth-json-assets/lib/spot-account-light.json';

const meta: Meta = {
  title: 'JSON / SpotAccount',
};

export default meta;
type Story = StoryObj;

export const SpotAccountStory: Story = {
  name: 'SpotAccount',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotAccount} loop={true} />
    </div>
  ),
};
