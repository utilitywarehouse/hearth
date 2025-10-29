/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSuccessLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-success-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSuccessLight',
};

export default meta;
type Story = StoryObj;

export const SpotSuccessLightStory: Story = {
  name: 'SpotSuccessLight',
  render: () => (
    <img src={SpotSuccessLightSrc as unknown as string} alt="SpotSuccessLight" style={{ maxWidth: 320 }} />
  ),
};
