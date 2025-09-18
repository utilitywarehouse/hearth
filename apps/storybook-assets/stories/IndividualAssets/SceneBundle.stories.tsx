/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SceneBundleSrc from '@utilitywarehouse/hearth-svg-assets/lib/scene-bundle.svg';

const meta: Meta = {
  title: 'Individual Assets/SceneBundle',
};

export default meta;
type Story = StoryObj;

export const SceneBundleStory: Story = {
  name: 'SceneBundle',
  render: () => (
    <img src={SceneBundleSrc as unknown as string} alt="SceneBundle" style={{ maxWidth: 320 }} />
  ),
};
