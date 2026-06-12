import type { Meta, StoryObj } from '@storybook/react-vite';
import { svgAssets } from '../../utils/svg-assets';
import { AssetsGrid } from './components/AssetsGrid';

const meta: Meta = {
  title: 'Hearth Assets / Collections / Mascots',
};

export default meta;
type Story = StoryObj;

export const Mascots: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return <AssetsGrid assets={svgAssets.filter(asset => asset.name.includes('Mascot'))} />;
  },
};
