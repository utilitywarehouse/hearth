import type { Meta, StoryObj } from '@storybook/react-native';
import { BellMediumIcon, SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { BodyText } from '../src/components/BodyText';
import { Card, CardAction, CardActions } from '../src/components/Card';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/Card',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type Scheme = 'neutralStrong' | 'neutralSubtle' | 'brand' | 'energy' | 'mobile';

const schemes: { scheme: Scheme; label: string }[] = [
  { scheme: 'neutralStrong', label: 'White' },
  { scheme: 'neutralSubtle', label: 'Warm' },
  { scheme: 'brand', label: 'Brand' },
  { scheme: 'energy', label: 'Energy' },
  { scheme: 'mobile', label: 'Mobile' },
];

const noop = () => {};

const Cards = () => {
  const { theme } = useUnistyles();
  return (
    <VTGrid>
      {schemes.map(({ scheme, label }) => (
        <View key={scheme} style={{ flexDirection: 'row', gap: theme.space[100] }}>
          <Card colorScheme={scheme} variant="subtle" style={{ flex: 1 }}>
            <BodyText>{`${label} subtle`}</BodyText>
          </Card>
          <Card colorScheme={scheme} variant="emphasis" style={{ flex: 1 }}>
            <BodyText inverted={scheme === 'brand'}>{`${label} bold`}</BodyText>
          </Card>
        </View>
      ))}
      {/* Padding leaves room so the shadow is not clipped. */}
      <View style={{ flexDirection: 'row', gap: theme.space[100], padding: theme.space[100] }}>
        <Card shadowColor="functional" variant="subtle" style={{ flex: 1 }}>
          <BodyText>Shadow subtle</BodyText>
        </Card>
        <Card shadowColor="brand" variant="emphasis" style={{ flex: 1 }}>
          <BodyText>Shadow bold</BodyText>
        </Card>
      </View>
      <Card variant="emphasis" flexDirection="column" alignItems="stretch" spacing="md">
        <CardActions>
          <CardAction heading="Action" leadingIcon={BellMediumIcon} onPress={noop} />
          <CardAction heading="Action" leadingIcon={SettingsMediumIcon} onPress={noop} />
        </CardActions>
      </Card>
    </VTGrid>
  );
};

export const Variants: Story = { render: () => <Cards /> };

export const VariantsDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Cards />,
};
