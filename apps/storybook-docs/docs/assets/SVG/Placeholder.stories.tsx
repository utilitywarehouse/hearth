/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Placeholder from '@utilitywarehouse/hearth-svg-assets/lib/placeholder.svg';

const meta: Meta = {
  title: 'Assets / SVG / Placeholder',
};

export default meta;
type Story = StoryObj;

export const PlaceholderStory: Story = {
  name: 'Placeholder',
  render: () => (
    <img src={Placeholder as unknown as string} alt="Placeholder" style={{ maxWidth: 320 }} />
  ),
};
