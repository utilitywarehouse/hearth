import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { StepperInput } from '../src/components/StepperInput';

const meta = {
  title: 'Visual Tests/StepperInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** StepperInput stacked: value, at minimum, focused, disabled, readonly and invalid. */
export const States: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <StepperInput caretHidden value="5" min={0} max={10} onChangeText={noop} />
      <StepperInput caretHidden value="0" min={0} max={10} onChangeText={noop} />
      <StepperInput caretHidden focused value="5" min={0} max={10} onChangeText={noop} />
      <StepperInput caretHidden disabled value="5" min={0} max={10} onChangeText={noop} />
      <StepperInput caretHidden readonly value="5" min={0} max={10} onChangeText={noop} />
      <StepperInput
        caretHidden
        validationStatus="invalid"
        value="5"
        min={0}
        max={10}
        onChangeText={noop}
      />
    </View>
  ),
};
