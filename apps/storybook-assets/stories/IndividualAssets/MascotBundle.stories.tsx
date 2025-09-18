/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import MascotBundleSrc from '@utilitywarehouse/hearth-svg-assets/lib/mascot-bundle.svg';

const meta: Meta = {
  title: 'Individual Assets/MascotBundle',
};

export default meta;
type Story = StoryObj;

export const MascotBundleStory: Story = {
  name: 'MascotBundle',
  render: () => (
    <img src={MascotBundleSrc as unknown as string} alt="MascotBundle" style={{ maxWidth: 320 }} />
  ),
};
