/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotSecurityCode from '@utilitywarehouse/hearth-json-assets/lib/spot-security-code-light.json';

const meta: Meta = {
  title: 'JSON / SpotSecurityCode',
};

export default meta;
type Story = StoryObj;

export const SpotSecurityCodeStory: Story = {
  name: 'SpotSecurityCode',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotSecurityCode} loop={true} />
    </div>
  ),
};
