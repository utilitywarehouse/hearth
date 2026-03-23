/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotDarkMode from '@utilitywarehouse/hearth-json-assets/lib/spot-dark-mode-light.json';

const meta: Meta = {
  title: 'JSON / SpotDarkMode',
};

export default meta;
type Story = StoryObj;

export const SpotDarkModeStory: Story = {
  name: 'SpotDarkMode',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotDarkMode} loop={true} />
    </div>
  ),
};
