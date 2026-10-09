import type { Meta, StoryObj } from '@storybook/react-native';
import { BodyText } from '../src/components/BodyText';
import { NavModal } from '../src/components/NavModal';

const meta = {
  title: 'Visual Tests/NavModal',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/**
 * `NavModal` is a plain screen layout (no bottom sheet), so it is always open.
 * `fullScreenModal` avoids the Android entrance overlay, which uses delayed
 * timings.
 */
export const Open: Story = {
  render: () => (
    <NavModal
      presentation="fullScreenModal"
      heading="Nav modal heading"
      description="A short description of the modal."
      primaryButtonText="Primary"
      onPressPrimaryButton={noop}
      secondaryButtonText="Cancel"
      onPressSecondaryButton={noop}
      onPressCloseButton={noop}
    >
      <BodyText>Some fixed modal content.</BodyText>
    </NavModal>
  ),
};
