import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { DetailText } from '../src/components/DetailText';
import { Heading } from '../src/components/Heading';
import { Helper } from '../src/components/Helper';
import { Label } from '../src/components/Label';

const meta = {
  title: 'Visual Tests/Typography',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <View style={{ gap: 2 }}>
      <BodyText size="sm">Body sm regular</BodyText>
      <BodyText size="md">Body md regular</BodyText>
      <BodyText size="lg">Body lg regular</BodyText>
      <BodyText size="xl">Body xl regular</BodyText>
      <BodyText weight="semibold">Body md semibold</BodyText>
      <BodyText weight="bold">Body md bold</BodyText>
      <Heading size="sm">Heading sm</Heading>
      <Heading size="md">Heading md</Heading>
      <Heading size="lg">Heading lg</Heading>
      <Heading size="xl">Heading xl</Heading>
      <Heading size="2xl">Heading 2xl</Heading>
    </View>
  ),
};

export const DetailAndLabels: Story = {
  render: () => (
    <View style={{ gap: 2 }}>
      <DetailText size="sm">Detail sm</DetailText>
      <DetailText size="md">Detail md</DetailText>
      <DetailText size="lg">Detail lg</DetailText>
      <DetailText size="xl">Detail xl</DetailText>
      <DetailText size="2xl">Detail 2xl</DetailText>
      <DetailText size="3xl">Detail 3xl</DetailText>
      <DetailText size="4xl">Detail 4xl</DetailText>
      <Label variant="body">Label body</Label>
      <Label variant="heading">Label heading</Label>
      <Helper text="Helper initial" />
      <Helper text="Helper valid" validationStatus="valid" />
      <Helper text="Helper invalid" validationStatus="invalid" />
    </View>
  ),
};
