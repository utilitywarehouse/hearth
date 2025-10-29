/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneMobileLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/scene-mobile-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SceneMobileLight',
};

export default meta;
type Story = StoryObj;

export const SceneMobileLightStory: Story = {
  name: 'SceneMobileLight',
  render: () => (
    <img src={SceneMobileLightSrc as unknown as string} alt="SceneMobileLight" style={{ maxWidth: 320 }} />
  ),
};
