import type { Meta, StoryObj } from '@storybook/react-native';
import { VerificationInput } from '../src/components/VerificationInput';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/VerificationInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** VerificationInput always renders its hidden input with `caretHidden`. */
export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Default">
        <VerificationInput value="" onChangeText={noop} />
      </VTRow>
      <VTRow label="Filled">
        <VerificationInput value="123456" onChangeText={noop} />
      </VTRow>
      <VTRow label="Valid">
        <VerificationInput
          value="123456"
          onChangeText={noop}
          validationStatus="valid"
          validText="Valid text"
        />
      </VTRow>
      <VTRow label="Invalid">
        <VerificationInput
          value="123456"
          onChangeText={noop}
          validationStatus="invalid"
          invalidText="Invalid text"
        />
      </VTRow>
      <VTRow label="Disabled">
        <VerificationInput value="123" onChangeText={noop} disabled />
      </VTRow>
      <VTRow label="Secure">
        <VerificationInput value="123456" onChangeText={noop} secureTextEntry />
      </VTRow>
    </VTGrid>
  ),
};
