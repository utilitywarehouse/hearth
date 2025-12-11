import type { Meta, StoryObj } from '@storybook/react-native';
import MascotEnergyDark from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-dark.svg';
import MascotEnergyLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-light.svg';
import SceneBroadbandDark from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-dark.svg';
import SceneBroadbandLight from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-light.svg';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import { SvgProps } from 'react-native-svg';
import pig from '../../../docs/assets/pigs.png';
import { Box } from '../Box';
import { ThemedImage } from './';

const meta: Meta<typeof ThemedImage> = {
  title: 'Stories / ThemedImage',
  component: ThemedImage,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'ThemedImage component that automatically switches between light and dark mode images or SVG components based on the current theme.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemedImage>;

export const Playground: Story = {
  args: {},
  render: () => (
    <Box gap="200">
      <ThemedImage
        // @ts-ignore
        light={<SpotBillingLight width={200} height={200} />}
        // @ts-ignore
        dark={<SpotBillingDark width={200} height={200} />}
      />
    </Box>
  ),
};

export const WithSpotIllustrations: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Box flexDirection="row" flexWrap="wrap" gap="200">
      <ThemedImage
        // @ts-ignore
        light={<SpotBillingLight width={120} height={120} />}
        // @ts-ignore
        dark={<SpotBillingDark width={120} height={120} />}
      />
    </Box>
  ),
};

export const WithMascots: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Box flexDirection="row" flexWrap="wrap" gap="200" alignItems="center">
      <ThemedImage
        light={MascotEnergyLight as unknown as React.FC<SvgProps>}
        dark={MascotEnergyDark as unknown as React.FC<SvgProps>}
        width={120}
        height={120}
      />
    </Box>
  ),
};

export const WithSceneIllustrations: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Box gap="200">
      <ThemedImage
        //  @ts-ignore
        light={<SceneBroadbandLight width={300} height={200} />}
        //  @ts-ignore
        dark={<SceneBroadbandDark width={300} height={200} />}
      />
    </Box>
  ),
};

export const WithRegularImages: Story = {
  parameters: {
    controls: { include: [] },
    docs: {
      description: {
        story:
          'ThemedImage also works with regular image sources (using `require` or `uri`), not just SVG components.',
      },
    },
  },
  render: () => (
    <Box gap="200">
      <ThemedImage
        light={{
          uri: pig,
        }}
        dark={{
          uri: pig,
        }}
        width={200}
        height={200}
        style={{ width: 200, height: 200, borderRadius: 8 }}
      />
    </Box>
  ),
};

export const WithCustomSize: Story = {
  parameters: {
    controls: { include: [] },
    docs: {
      description: {
        story: 'When using SVG components, control their size with width and height props.',
      },
    },
  },
  render: () => (
    <Box flexDirection="row" flexWrap="wrap" gap="200" alignItems="center">
      <ThemedImage
        // @ts-ignore
        light={<SpotBillingLight width={80} height={80} />}
        // @ts-ignore
        dark={<SpotBillingDark width={80} height={80} />}
      />
      <ThemedImage
        // @ts-ignore
        light={<SpotBillingLight width={120} height={120} />}
        // @ts-ignore
        dark={<SpotBillingDark width={120} height={120} />}
      />
      <ThemedImage
        // @ts-ignore
        light={<SpotBillingLight width={160} height={160} />}
        // @ts-ignore
        dark={<SpotBillingDark width={160} height={160} />}
      />
    </Box>
  ),
};

export const WithAccessibility: Story = {
  parameters: {
    controls: { include: [] },
    docs: {
      description: {
        story:
          'ThemedImage supports all standard Image accessibility props like `accessibilityLabel` and `accessible`.',
      },
    },
  },
  render: () => (
    <Box gap="200">
      <ThemedImage
        // @ts-ignore
        light={<MascotEnergyLight width={150} height={150} />}
        // @ts-ignore
        dark={<MascotEnergyDark width={150} height={150} />}
        accessible={true}
        accessibilityLabel="Energy service mascot illustration"
      />
    </Box>
  ),
};
