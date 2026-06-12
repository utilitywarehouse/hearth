/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneMobileDark from '@utilitywarehouse/hearth-svg-assets/lib/scene-mobile-dark.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / SceneMobileDark',
};

export default meta;
type Story = StoryObj;

export const SceneMobileDarkStory: Story = {
  name: 'SceneMobileDark',
  render: () => (
    <img src={SceneMobileDark as unknown as string} alt="SceneMobileDark" style={{ maxWidth: 320 }} />
  ),
};
