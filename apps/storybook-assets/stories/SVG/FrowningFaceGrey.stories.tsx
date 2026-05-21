/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import FrowningFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/frowning-face-grey.svg';

const meta: Meta = {
  title: 'SVG / FrowningFaceGrey',
};

export default meta;
type Story = StoryObj;

export const FrowningFaceGreyStory: Story = {
  name: 'FrowningFaceGrey',
  render: () => (
    <img src={FrowningFaceGrey as unknown as string} alt="FrowningFaceGrey" style={{ maxWidth: 320 }} />
  ),
};
