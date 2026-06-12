/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SlightlySmilingFace from '@utilitywarehouse/hearth-svg-assets/lib/slightly-smiling-face.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / SlightlySmilingFace',
};

export default meta;
type Story = StoryObj;

export const SlightlySmilingFaceStory: Story = {
  name: 'SlightlySmilingFace',
  render: () => (
    <img src={SlightlySmilingFace as unknown as string} alt="SlightlySmilingFace" style={{ maxWidth: 320 }} />
  ),
};
