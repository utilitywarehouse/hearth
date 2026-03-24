/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotWelcome from '@utilitywarehouse/hearth-json-assets/lib/spot-welcome-light.json';

const meta: Meta = {
  title: 'JSON / SpotWelcome',
};

export default meta;
type Story = StoryObj;

export const SpotWelcomeStory: Story = {
  name: 'SpotWelcome',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotWelcome} loop={true} />
    </div>
  ),
};
