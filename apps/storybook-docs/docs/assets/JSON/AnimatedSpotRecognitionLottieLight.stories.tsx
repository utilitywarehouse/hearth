/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotRecognitionLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-recognition--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotRecognitionLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotRecognitionLottieLightStory: Story = {
  name: 'AnimatedSpotRecognitionLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotRecognitionLottieLight} loop={true} />
    </div>
  ),
};
