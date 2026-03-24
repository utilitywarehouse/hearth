/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotHelp from '@utilitywarehouse/hearth-json-assets/lib/spot-help-light.json';

const meta: Meta = {
  title: 'JSON / SpotHelp',
};

export default meta;
type Story = StoryObj;

export const SpotHelpStory: Story = {
  name: 'SpotHelp',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotHelp} loop={true} />
    </div>
  ),
};
