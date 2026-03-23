/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWMonoOffWhite from '@utilitywarehouse/hearth-json-assets/lib/uw-mono-off-white-light.json';

const meta: Meta = {
  title: 'JSON / UWMonoOffWhite',
};

export default meta;
type Story = StoryObj;

export const UWMonoOffWhiteStory: Story = {
  name: 'UWMonoOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWMonoOffWhite} loop={true} />
    </div>
  ),
};
