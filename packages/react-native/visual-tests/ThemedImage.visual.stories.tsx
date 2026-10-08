import type { Meta, StoryObj } from '@storybook/react-native';
import MascotEnergyDark from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-dark.svg';
import MascotEnergyLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-light.svg';
import SceneBroadbandDark from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-dark.svg';
import SceneBroadbandLight from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-light.svg';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import type { ComponentType } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import pigs from '../docs/assets/pigs.png';
import { ThemedImage } from '../src/components/ThemedImage';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ThemedImage',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const asSvg = (svg: unknown) => svg as ComponentType<SvgProps>;

const Images = () => (
  <VTGrid>
    <VTRow label="Spot, mascot, image">
      <ThemedImage
        light={asSvg(SpotBillingLight)}
        dark={asSvg(SpotBillingDark)}
        width={96}
        height={96}
      />
      <ThemedImage
        light={asSvg(MascotEnergyLight)}
        dark={asSvg(MascotEnergyDark)}
        width={96}
        height={96}
      />
      <ThemedImage
        light={pigs as ImageSourcePropType}
        dark={pigs as ImageSourcePropType}
        style={{ width: 96, height: 96 }}
      />
    </VTRow>
    <VTRow label="Scene">
      <ThemedImage
        light={asSvg(SceneBroadbandLight)}
        dark={asSvg(SceneBroadbandDark)}
        width={300}
        height={200}
      />
    </VTRow>
  </VTGrid>
);

export const Types: Story = { render: () => <Images /> };

export const TypesDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Images />,
};
