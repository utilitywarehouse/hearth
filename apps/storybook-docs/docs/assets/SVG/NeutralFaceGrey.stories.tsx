/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import NeutralFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/neutral-face-grey.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / NeutralFaceGrey',
};

export default meta;
type Story = StoryObj;

export const NeutralFaceGreyStory: Story = {
  name: 'NeutralFaceGrey',
  render: () => (
    <img src={NeutralFaceGrey as unknown as string} alt="NeutralFaceGrey" style={{ maxWidth: 320 }} />
  ),
};
