import type { Meta, StoryObj } from '@storybook/react-vite';
import { jsonAssets } from '../../utils/json-assets';
import { AssetsGrid } from './components/AssetsGrid';

const meta: Meta = {
  title: 'Assets / Collections / Animated',
};

export default meta;
type Story = StoryObj;

export const Animated: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return <AssetsGrid assets={jsonAssets} />;
  },
};
