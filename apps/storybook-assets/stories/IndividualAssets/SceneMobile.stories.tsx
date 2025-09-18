/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneMobileSrc from '@utilitywarehouse/hearth-svg-assets/lib/scene-mobile.svg';

const meta: Meta = {
  title: 'Individual Assets/SceneMobile',
};

export default meta;
type Story = StoryObj;

export const SceneMobileStory: Story = {
  name: 'SceneMobile',
  render: () => (
    <img src={SceneMobileSrc as unknown as string} alt="SceneMobile" style={{ maxWidth: 320 }} />
  ),
};
