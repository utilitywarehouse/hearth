/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotRecognition from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-recognition-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotRecognition',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotRecognitionStory: Story = {
  name: 'AnimatedSpotRecognition',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotRecognition} loop={true} />
    </div>
  ),
};
