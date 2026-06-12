/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import BeamingFace from '@utilitywarehouse/hearth-svg-assets/lib/beaming-face.svg';

const meta: Meta = {
  title: 'Assets / SVG / BeamingFace',
};

export default meta;
type Story = StoryObj;

export const BeamingFaceStory: Story = {
  name: 'BeamingFace',
  render: () => (
    <img src={BeamingFace as unknown as string} alt="BeamingFace" style={{ maxWidth: 320 }} />
  ),
};
