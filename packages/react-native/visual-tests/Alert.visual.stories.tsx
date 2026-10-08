import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert } from '../src/components/Alert';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/Alert',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const Schemes = () => (
  <VTGrid>
    <Alert
      colorScheme="info"
      title="Info"
      text="Short message."
      link="Learn more"
      onPressLink={noop}
      onClose={noop}
    />
    <Alert
      colorScheme="positive"
      title="Positive"
      text="Short message."
      link="Learn more"
      onPressLink={noop}
      onClose={noop}
    />
    <Alert
      colorScheme="warning"
      title="Warning"
      text="Short message."
      link="Learn more"
      onPressLink={noop}
      onClose={noop}
    />
    <Alert
      colorScheme="danger"
      title="Danger"
      text="Short message."
      link="Learn more"
      onPressLink={noop}
      onClose={noop}
    />
  </VTGrid>
);

export const ColorSchemes: Story = { render: () => <Schemes /> };

export const ColorSchemesDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Schemes />,
};
