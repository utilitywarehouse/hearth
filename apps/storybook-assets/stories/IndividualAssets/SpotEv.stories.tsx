/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotEvSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-ev.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotEv',
};

export default meta;
type Story = StoryObj;

export const SpotEvStory: Story = {
  name: 'SpotEv',
  render: () => (
    <img src={SpotEvSrc as unknown as string} alt="SpotEv" style={{ maxWidth: 320 }} />
  ),
};
