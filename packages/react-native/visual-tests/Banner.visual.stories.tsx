import type { Meta, StoryObj } from '@storybook/react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import type { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import pigs from '../docs/assets/pigs.png';
import { Banner, BannerIllustration, BannerImage } from '../src/components/Banner';
import { Button } from '../src/components/Button';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/Banner',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const SpotBillingLightSvg = SpotBillingLight as unknown as ComponentType<SvgProps>;
const SpotBillingDarkSvg = SpotBillingDark as unknown as ComponentType<SvgProps>;

type SchemeName = NonNullable<ComponentProps<typeof Banner>['colorScheme']>;

const SCHEME_LABELS: [SchemeName, string][] = [
  ['neutralStrong', 'Neutral strong'],
  ['neutralSubtle', 'Neutral subtle'],
  ['brand', 'Brand'],
  ['energy', 'Energy'],
  ['broadband', 'Broadband'],
  ['mobile', 'Mobile'],
  ['insurance', 'Insurance'],
  ['cashback', 'Cashback'],
  ['pig', 'Pig'],
  ['highlight', 'Highlight'],
];

/** One row per scheme: subtle on the left, emphasis on the right. */
const Schemes = ({ schemes }: { schemes: [SchemeName, string][] }) => (
  <VTGrid>
    {schemes.map(([colorScheme, label]) => (
      <View key={colorScheme} style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Banner colorScheme={colorScheme} variant="subtle" heading={label} description="Subtle" />
        </View>
        <View style={{ flex: 1 }}>
          <Banner
            colorScheme={colorScheme}
            variant="emphasis"
            heading={label}
            description="Emphasis"
          />
        </View>
      </View>
    ))}
  </VTGrid>
);

const FIRST_SCHEMES = SCHEME_LABELS.slice(0, 5);
const MORE_SCHEMES = SCHEME_LABELS.slice(5);

export const ColorSchemes: Story = { render: () => <Schemes schemes={FIRST_SCHEMES} /> };

export const ColorSchemesMore: Story = { render: () => <Schemes schemes={MORE_SCHEMES} /> };

export const ColorSchemesDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Schemes schemes={FIRST_SCHEMES} />,
};

export const ColorSchemesMoreDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Schemes schemes={MORE_SCHEMES} />,
};

export const Layouts: Story = {
  render: () => (
    <VTGrid>
      <Banner
        icon={ElectricityMediumIcon}
        iconContainerColor="energy"
        heading="Icon"
        description="Short text."
      />
      <Banner
        illustration={
          <BannerIllustration
            light={<SpotBillingLightSvg width={96} height={56} />}
            dark={<SpotBillingDarkSvg width={96} height={56} />}
          />
        }
        heading="Illustration"
        description="Short text."
      />
      <Banner
        image={
          <BannerImage source={pigs as ImageSourcePropType} style={{ width: 96, height: 56 }} />
        }
        heading="Image"
        description="Short text."
      />
      <Banner
        direction="vertical"
        icon={ElectricityMediumIcon}
        iconContainerColor="energy"
        heading="Vertical"
        description="Short text."
        button={<Button size="sm" text="Action" onPress={noop} />}
      />
    </VTGrid>
  ),
};
