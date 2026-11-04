import {
  BroadbandSmallIcon,
  ElectricitySmallIcon,
  MobileSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { View } from 'react-native';
import { BodyText, Flex, SegmentedControl, SegmentedControlOption } from '../';

const meta = {
  title: 'Stories / Segmented Control',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'sm',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;

export const Playground = {
  render: (args: { size?: 'sm' | 'md'; disabled?: boolean; fullWidth?: boolean }) => (
    // Fixed-width wrapper so `fullWidth` has a container to fill in the centered layout.
    <View style={{ width: 320 }}>
      <SegmentedControl defaultValue="day" {...args}>
        <SegmentedControlOption value="day">Day</SegmentedControlOption>
        <SegmentedControlOption value="week">Week</SegmentedControlOption>
        <SegmentedControlOption value="month">Month</SegmentedControlOption>
      </SegmentedControl>
    </View>
  ),
};

export const FullWidth = {
  render: () => (
    <View>
      <Flex spacing="sm">
        <SegmentedControl defaultValue="one" size="sm">
          <SegmentedControlOption value="one">Label</SegmentedControlOption>
          <SegmentedControlOption value="two">Label</SegmentedControlOption>
          <SegmentedControlOption value="three">Label</SegmentedControlOption>
        </SegmentedControl>
        <SegmentedControl defaultValue="one" size="sm" fullWidth>
          <SegmentedControlOption value="one">Label</SegmentedControlOption>
          <SegmentedControlOption value="two">Label</SegmentedControlOption>
          <SegmentedControlOption value="three">Label</SegmentedControlOption>
        </SegmentedControl>
        <SegmentedControl defaultValue="one" size="md">
          <SegmentedControlOption value="one">Label</SegmentedControlOption>
          <SegmentedControlOption value="two">Label</SegmentedControlOption>
          <SegmentedControlOption value="three">Label</SegmentedControlOption>
        </SegmentedControl>
        <SegmentedControl defaultValue="one" size="md" fullWidth>
          <SegmentedControlOption value="one">Label</SegmentedControlOption>
          <SegmentedControlOption value="two">Label</SegmentedControlOption>
          <SegmentedControlOption value="three">Label</SegmentedControlOption>
        </SegmentedControl>
      </Flex>
    </View>
  ),
};

export const Sizes = {
  render: () => (
    <Flex spacing="sm" align="center">
      <SegmentedControl defaultValue="one" size="sm">
        <SegmentedControlOption value="one">Label</SegmentedControlOption>
        <SegmentedControlOption value="two">Label</SegmentedControlOption>
        <SegmentedControlOption value="three">Label</SegmentedControlOption>
      </SegmentedControl>
      <SegmentedControl defaultValue="one" size="md">
        <SegmentedControlOption value="one">Label</SegmentedControlOption>
        <SegmentedControlOption value="two">Label</SegmentedControlOption>
        <SegmentedControlOption value="three">Label</SegmentedControlOption>
      </SegmentedControl>
    </Flex>
  ),
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('annual');
    return (
      <Flex spacing="sm" align="center">
        <SegmentedControl value={value} onValueChange={setValue}>
          <SegmentedControlOption value="monthly">Monthly</SegmentedControlOption>
          <SegmentedControlOption value="annual">Annual</SegmentedControlOption>
        </SegmentedControl>
        <BodyText size="sm">Selected: {value}</BodyText>
      </Flex>
    );
  },
};

export const Disabled = {
  render: () => (
    <SegmentedControl defaultValue="left" disabled>
      <SegmentedControlOption value="left">Left</SegmentedControlOption>
      <SegmentedControlOption value="center">Center</SegmentedControlOption>
      <SegmentedControlOption value="right">Right</SegmentedControlOption>
    </SegmentedControl>
  ),
};

export const WithIcons = {
  render: () => (
    <SegmentedControl defaultValue="energy" size="md">
      <SegmentedControlOption value="energy" icon={ElectricitySmallIcon}>
        Energy
      </SegmentedControlOption>
      <SegmentedControlOption value="broadband" icon={BroadbandSmallIcon}>
        Broadband
      </SegmentedControlOption>
      <SegmentedControlOption value="mobile" icon={MobileSmallIcon}>
        Mobile
      </SegmentedControlOption>
    </SegmentedControl>
  ),
};
