/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotHeartLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-heart-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotHeartLight',
};

export default meta;
type Story = StoryObj;

export const SpotHeartLightStory: Story = {
  name: 'SpotHeartLight',
  render: () => (
    <img src={SpotHeartLightSrc as unknown as string} alt="SpotHeartLight" style={{ maxWidth: 320 }} />
  ),
};
