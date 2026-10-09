import type { Meta, StoryObj } from '@storybook/react-native';
import { Switch } from '../src/components/Switch';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Switch',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Medium">
        <Switch size="md" value={false} onValueChange={noop} />
        <Switch size="md" value onValueChange={noop} />
      </VTRow>
      <VTRow label="Small">
        <Switch size="sm" value={false} onValueChange={noop} />
        <Switch size="sm" value onValueChange={noop} />
      </VTRow>
      <VTRow label="Medium disabled">
        <Switch size="md" value={false} disabled onValueChange={noop} />
        <Switch size="md" value disabled onValueChange={noop} />
      </VTRow>
      <VTRow label="Small disabled">
        <Switch size="sm" value={false} disabled onValueChange={noop} />
        <Switch size="sm" value disabled onValueChange={noop} />
      </VTRow>
    </VTGrid>
  ),
};
