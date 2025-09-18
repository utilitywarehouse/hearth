// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import { svgAssets } from '../utils/svg-assets';
import { AssetsGrid } from './components/AssetsGrid';

const meta: Meta = {
  title: 'All Assets',
};

export default meta;
type Story = StoryObj;

export const AllAssets: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return <AssetsGrid assets={svgAssets} />;
  },
};
