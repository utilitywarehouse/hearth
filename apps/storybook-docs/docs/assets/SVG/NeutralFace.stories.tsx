/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import NeutralFace from '@utilitywarehouse/hearth-svg-assets/lib/neutral-face.svg';

const meta: Meta = {
  title: 'Assets / SVG / NeutralFace',
};

export default meta;
type Story = StoryObj;

export const NeutralFaceStory: Story = {
  name: 'NeutralFace',
  render: () => (
    <img src={NeutralFace as unknown as string} alt="NeutralFace" style={{ maxWidth: 320 }} />
  ),
};
