/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotTickLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-tick-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotTickLight',
};

export default meta;
type Story = StoryObj;

export const SpotTickLightStory: Story = {
  name: 'SpotTickLight',
  render: () => (
    <img src={SpotTickLightSrc as unknown as string} alt="SpotTickLight" style={{ maxWidth: 320 }} />
  ),
};
