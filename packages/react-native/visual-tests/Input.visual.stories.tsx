import type { Meta, StoryObj } from '@storybook/react-native';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Input } from '../src/components/Input';

const meta = {
  title: 'Visual Tests/Input',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Two-column grid. The input text doubles as the label, which keeps it dense. */
const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

const Inputs = () => (
  <Cols>
    <Cell>
      <Input caretHidden placeholder="Placeholder" />
    </Cell>
    <Cell>
      <Input caretHidden focused value="Focused" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden disabled value="Disabled" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden readonly value="Readonly" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden validationStatus="valid" value="Valid" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden validationStatus="valid" focused value="Valid focus" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden validationStatus="valid" disabled value="Valid off" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden validationStatus="valid" readonly value="Valid read" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden validationStatus="invalid" value="Invalid" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input
        caretHidden
        validationStatus="invalid"
        focused
        value="Invalid focus"
        onChangeText={noop}
      />
    </Cell>
    <Cell>
      <Input
        caretHidden
        validationStatus="invalid"
        disabled
        value="Invalid off"
        onChangeText={noop}
      />
    </Cell>
    <Cell>
      <Input
        caretHidden
        validationStatus="invalid"
        readonly
        value="Invalid read"
        onChangeText={noop}
      />
    </Cell>
    <Cell>
      <Input caretHidden leadingIcon={EmailMediumIcon} value="Icon" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input caretHidden type="password" value="secret" onChangeText={noop} />
    </Cell>
    <Cell>
      <Input
        caretHidden
        type="search"
        clearable
        value="Search"
        onChangeText={noop}
        onClear={noop}
      />
    </Cell>
    <Cell>
      <Input caretHidden type="search" loading value="Loading" onChangeText={noop} />
    </Cell>
  </Cols>
);

export const States: Story = { render: () => <Inputs /> };

export const StatesDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Inputs />,
};
