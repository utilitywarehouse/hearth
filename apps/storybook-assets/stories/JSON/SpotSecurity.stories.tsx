/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSecurity from '@utilitywarehouse/hearth-json-assets/lib/spot-security-light.json';

const meta: Meta = {
  title: 'JSON / SpotSecurity',
};

export default meta;
type Story = StoryObj;

export const SpotSecurityStory: Story = {
  name: 'SpotSecurity',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSecurity} loop={true} />
    </div>
  ),
};
