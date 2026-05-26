/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotRecognitionLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-recognition-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotRecognitionLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotRecognitionLightStory: Story = {
  name: 'AnimatedSpotRecognitionLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotRecognitionLight} loop={true} />
    </div>
  ),
};
