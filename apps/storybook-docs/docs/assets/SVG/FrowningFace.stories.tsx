/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import FrowningFace from '@utilitywarehouse/hearth-svg-assets/lib/frowning-face.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / FrowningFace',
};

export default meta;
type Story = StoryObj;

export const FrowningFaceStory: Story = {
  name: 'FrowningFace',
  render: () => (
    <img src={FrowningFace as unknown as string} alt="FrowningFace" style={{ maxWidth: 320 }} />
  ),
};
