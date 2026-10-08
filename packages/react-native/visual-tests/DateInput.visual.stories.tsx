import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { DateInput } from '../src/components/DateInput';

const meta = {
  title: 'Visual Tests/DateInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/**
 * DateInput does not forward `caretHidden` to its segment inputs. None of the
 * segments is focused here, so no caret renders.
 */
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <DateInput
        label="Date of birth"
        helperText="Helper text"
        dayValue="15"
        monthValue="03"
        yearValue="1990"
        onDayChange={noop}
        onMonthChange={noop}
        onYearChange={noop}
      />
      <DateInput
        label="Card expiry"
        hideDay
        monthValue="09"
        yearValue="2028"
        onMonthChange={noop}
        onYearChange={noop}
      />
      <DateInput label="Year only" hideDay hideMonth yearValue="2024" onYearChange={noop} />
      <DateInput
        label="Invalid"
        validationStatus="invalid"
        invalidText="Invalid text"
        dayValue="31"
        monthValue="02"
        yearValue="1990"
        onDayChange={noop}
        onMonthChange={noop}
        onYearChange={noop}
      />
    </View>
  ),
};
