/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import DissapointedFace from '@utilitywarehouse/hearth-svg-assets/lib/dissapointed-face.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / DissapointedFace',
};

export default meta;
type Story = StoryObj;

export const DissapointedFaceStory: Story = {
  name: 'DissapointedFace',
  render: () => (
    <img src={DissapointedFace as unknown as string} alt="DissapointedFace" style={{ maxWidth: 320 }} />
  ),
};
