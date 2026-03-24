/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotRecognition from '@utilitywarehouse/hearth-json-assets/lib/spot-recognition-light.json';

const meta: Meta = {
  title: 'JSON / SpotRecognition',
};

export default meta;
type Story = StoryObj;

export const SpotRecognitionStory: Story = {
  name: 'SpotRecognition',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotRecognition} loop={true} />
    </div>
  ),
};
