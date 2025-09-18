/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import LogoFullWarmWhiteSrc from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-warm-white.svg';

const meta: Meta = {
  title: 'Individual Assets/LogoFullWarmWhite',
};

export default meta;
type Story = StoryObj;

export const LogoFullWarmWhiteStory: Story = {
  name: 'LogoFullWarmWhite',
  render: () => (
    <img src={LogoFullWarmWhiteSrc as unknown as string} alt="LogoFullWarmWhite" style={{ maxWidth: 320 }} />
  ),
};
