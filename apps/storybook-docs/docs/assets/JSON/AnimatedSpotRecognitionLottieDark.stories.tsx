/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotRecognitionLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-recognition--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotRecognitionLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotRecognitionLottieDarkStory: Story = {
  name: 'AnimatedSpotRecognitionLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotRecognitionLottieDark} loop={true} />
    </div>
  ),
};
