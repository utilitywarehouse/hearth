/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotNewLook from '@utilitywarehouse/hearth-json-assets/lib/spot-new-look-light.json';

const meta: Meta = {
  title: 'JSON / SpotNewLook',
};

export default meta;
type Story = StoryObj;

export const SpotNewLookStory: Story = {
  name: 'SpotNewLook',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotNewLook} loop={true} />
    </div>
  ),
};
