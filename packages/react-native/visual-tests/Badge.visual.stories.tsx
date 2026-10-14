import type { Meta, StoryObj } from '@storybook/react-native';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Badge, BadgeIcon, BadgeText } from '../src/components/Badge';
import type BadgeProps from '../src/components/Badge/Badge.props';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Badge',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type ColorScheme = NonNullable<BadgeProps['colorScheme']>;

const allSchemes: ColorScheme[] = [
  'info',
  'positive',
  'danger',
  'warning',
  'functional',
  'energy',
  'broadband',
  'mobile',
  'insurance',
  'cashback',
  'pig',
  'highlight',
];

// Outline is only designed for the semantic and functional schemes.
const outlineSchemes: ColorScheme[] = ['info', 'positive', 'danger', 'warning', 'functional'];

const Schemes = () => (
  <VTGrid>
    <VTRow label="Subtle">
      {allSchemes.map(colorScheme => (
        <Badge key={colorScheme} variant="subtle" colorScheme={colorScheme} text={colorScheme} />
      ))}
    </VTRow>
    <VTRow label="Emphasis">
      {allSchemes.map(colorScheme => (
        <Badge key={colorScheme} variant="emphasis" colorScheme={colorScheme} text={colorScheme} />
      ))}
    </VTRow>
    <VTRow label="Outline">
      {outlineSchemes.map(colorScheme => (
        <Badge key={colorScheme} variant="outline" colorScheme={colorScheme} text={colorScheme} />
      ))}
    </VTRow>
  </VTGrid>
);

export const ColorSchemes: Story = { render: () => <Schemes /> };

export const ColorSchemesDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Schemes />,
};

export const SizesAndOptions: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Size">
        <Badge size="sm" text="Small" />
        <Badge size="md" text="Medium" />
      </VTRow>
      <VTRow label="Flat base">
        <Badge flatBase text="Subtle" />
        <Badge flatBase variant="emphasis" text="Emphasis" />
        <Badge flatBase variant="outline" text="Outline" />
      </VTRow>
      <VTRow label="Icon">
        <Badge icon={TickSmallIcon} colorScheme="positive" text="Small" />
        <Badge
          icon={TickSmallIcon}
          size="md"
          variant="emphasis"
          colorScheme="positive"
          text="Medium"
        />
        <Badge icon={TickSmallIcon} variant="outline" colorScheme="positive" text="Outline" />
      </VTRow>
    </VTGrid>
  ),
};

/** Badges composed from `BadgeIcon` and `BadgeText` child parts. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Icon and text">
        <Badge colorScheme="positive" variant="outline">
          <BadgeIcon as={TickSmallIcon} />
          <BadgeText>Outline</BadgeText>
        </Badge>
        <Badge colorScheme="danger" variant="emphasis" size="md">
          <BadgeIcon as={TickSmallIcon} />
          <BadgeText>Emphasis</BadgeText>
        </Badge>
        <Badge colorScheme="warning">
          <BadgeText>Text only</BadgeText>
        </Badge>
      </VTRow>
    </VTGrid>
  ),
};
