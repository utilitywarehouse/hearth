import type { Meta, StoryObj } from '@storybook/react-vite';
import piggies from '../../../docs/assets/piggies.png';
import { BannerImage } from './BannerImage';

const meta: Meta<typeof BannerImage> = {
  title: 'Components / BannerImage',
  component: BannerImage,
  args: { width: '300px', height: '200px' },
};

export default meta;
type Story = StoryObj<typeof BannerImage>;

/** Wrap an image to give it a border and rounded corners. */
export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => (
    <BannerImage {...args}>
      <img src={piggies} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
    </BannerImage>
  ),
};
