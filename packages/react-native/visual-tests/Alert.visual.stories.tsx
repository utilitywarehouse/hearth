import type { Meta, StoryObj } from '@storybook/react-native';
import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertIcon,
  AlertIconButton,
  AlertLink,
  AlertText,
  AlertTitle,
} from '../src/components/Alert';
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

/**
 * Alerts composed from the child parts. `AlertIconButton` is not combined with
 * `AlertLink`, as the docs advise.
 */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <Alert colorScheme="info">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Information</AlertTitle>
          <AlertText>Short message.</AlertText>
          <AlertLink onPress={noop}>Learn more</AlertLink>
        </AlertContent>
        <AlertCloseButton onPress={noop} />
      </Alert>
      <Alert colorScheme="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Warning</AlertTitle>
          <AlertText>Short message.</AlertText>
        </AlertContent>
        <AlertIconButton onPress={noop} />
        <AlertCloseButton onPress={noop} />
      </Alert>
    </VTGrid>
  ),
};
