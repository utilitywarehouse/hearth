/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotEvLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-ev-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotEvLight',
};

export default meta;
type Story = StoryObj;

export const SpotEvLightStory: Story = {
  name: 'SpotEvLight',
  render: () => (
    <img src={SpotEvLightSrc as unknown as string} alt="SpotEvLight" style={{ maxWidth: 320 }} />
  ),
};
