/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotKeepTrack from '@utilitywarehouse/hearth-json-assets/lib/spot-keep-track-light.json';

const meta: Meta = {
  title: 'JSON / SpotKeepTrack',
};

export default meta;
type Story = StoryObj;

export const SpotKeepTrackStory: Story = {
  name: 'SpotKeepTrack',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotKeepTrack} loop={true} />
    </div>
  ),
};
