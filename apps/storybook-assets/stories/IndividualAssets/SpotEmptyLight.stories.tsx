/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotEmptyLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-empty-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotEmptyLight',
};

export default meta;
type Story = StoryObj;

export const SpotEmptyLightStory: Story = {
  name: 'SpotEmptyLight',
  render: () => (
    <img src={SpotEmptyLightSrc as unknown as string} alt="SpotEmptyLight" style={{ maxWidth: 320 }} />
  ),
};
