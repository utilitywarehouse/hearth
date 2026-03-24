/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWMonoPurple from '@utilitywarehouse/hearth-json-assets/lib/uw-mono-purple-light.json';

const meta: Meta = {
  title: 'JSON / UWMonoPurple',
};

export default meta;
type Story = StoryObj;

export const UWMonoPurpleStory: Story = {
  name: 'UWMonoPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWMonoPurple} loop={true} />
    </div>
  ),
};
