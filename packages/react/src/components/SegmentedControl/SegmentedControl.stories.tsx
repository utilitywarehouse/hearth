import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BroadbandMediumIcon,
  BroadbandSmallIcon,
  ElectricityMediumIcon,
  ElectricitySmallIcon,
  GasMediumIcon,
  GasSmallIcon,
  MobileMediumIcon,
  MobileSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { Box } from '../Box/Box';
import { BodyText } from '../BodyText/BodyText';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlOption } from './SegmentedControlOption';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components / SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
    multiple: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    size: 'sm',
    defaultValue: ['option-1'],
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true }, chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="400">
      <BodyText as="p" size="md" weight="semibold">
        SM — labels
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-2">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-3">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-4">Label</SegmentedControlOption>
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        MD — labels
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="md">
        <SegmentedControlOption value="option-1">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-2">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-3">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-4">Label</SegmentedControlOption>
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        SM — icons + labels
      </BodyText>
      <SegmentedControl defaultValue={['gas']} size="sm">
        <SegmentedControlOption value="gas" icon={<GasSmallIcon />}>
          Gas
        </SegmentedControlOption>
        <SegmentedControlOption value="electricity" icon={<ElectricitySmallIcon />}>
          Electricity
        </SegmentedControlOption>
        <SegmentedControlOption value="mobile" icon={<MobileSmallIcon />}>
          Mobile
        </SegmentedControlOption>
        <SegmentedControlOption value="broadband" icon={<BroadbandSmallIcon />}>
          Broadband
        </SegmentedControlOption>
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        MD — icons + labels
      </BodyText>
      <SegmentedControl defaultValue={['gas']} size="md">
        <SegmentedControlOption value="gas" icon={<GasMediumIcon />}>
          Gas
        </SegmentedControlOption>
        <SegmentedControlOption value="electricity" icon={<ElectricityMediumIcon />}>
          Electricity
        </SegmentedControlOption>
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        Disabled
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm" disabled>
        <SegmentedControlOption value="option-1">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-2">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-3">Label</SegmentedControlOption>
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        Per-option disabled
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1">Label</SegmentedControlOption>
        <SegmentedControlOption value="option-2" disabled>
          Label
        </SegmentedControlOption>
        <SegmentedControlOption value="option-3">Label</SegmentedControlOption>
      </SegmentedControl>
    </Flex>
  ),
};

export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: (args: Story['args']) => (
    <SegmentedControl {...args} defaultValue={['option-1']}>
      <SegmentedControlOption value="option-1">Option 1</SegmentedControlOption>
      <SegmentedControlOption value="option-2">Option 2</SegmentedControlOption>
      <SegmentedControlOption value="option-3">Option 3</SegmentedControlOption>
      <SegmentedControlOption value="option-4">Option 4</SegmentedControlOption>
    </SegmentedControl>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Flex direction="column" gap="300">
      <SegmentedControl defaultValue={['gas']} size="sm">
        <SegmentedControlOption value="gas" icon={<GasSmallIcon />}>
          Gas
        </SegmentedControlOption>
        <SegmentedControlOption value="electricity" icon={<ElectricitySmallIcon />}>
          Electricity
        </SegmentedControlOption>
      </SegmentedControl>
      <SegmentedControl defaultValue={['gas']} size="md">
        <SegmentedControlOption value="gas" icon={<GasMediumIcon />}>
          Gas
        </SegmentedControlOption>
        <SegmentedControlOption value="electricity" icon={<ElectricityMediumIcon />}>
          Electricity
        </SegmentedControlOption>
      </SegmentedControl>
    </Flex>
  ),
};

const ALL_OPTIONS = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
  { value: 'option-4', label: 'Option 4' },
  { value: 'option-5', label: 'Option 5' },
  { value: 'option-6', label: 'Option 6' },
  { value: 'option-7', label: 'Option 7' },
  { value: 'option-8', label: 'Option 8' },
  { value: 'option-9', label: 'Option 9' },
  { value: 'option-10', label: 'Option 10' },
  { value: 'option-11', label: 'Option 11' },
  { value: 'option-12', label: 'Option 12' },
  { value: 'option-13', label: 'Option 13' },
];

export const DynamicOptions: Story = {
  render: () => {
    const [options, setOptions] = useState(ALL_OPTIONS.slice(0, 3));
    const [value, setValue] = useState(['option-1']);

    const addOption = () => {
      if (options.length < ALL_OPTIONS.length) {
        setOptions(ALL_OPTIONS.slice(0, options.length + 1));
      }
    };

    const removeOption = () => {
      if (options.length > 1) {
        const next = options.slice(0, options.length - 1);
        setOptions(next);
        if (!next.find(o => o.value === value[0])) {
          setValue([next[next.length - 1].value]);
        }
      }
    };

    return (
      <Flex direction="column" gap="400" alignItems="start">
        <SegmentedControl value={value} onValueChange={setValue} size="sm">
          {options.map(o => (
            <SegmentedControlOption key={o.value} value={o.value}>
              {o.label}
            </SegmentedControlOption>
          ))}
        </SegmentedControl>
        <Flex gap="200">
          <Button size="sm" variant="outline" onClick={removeOption} disabled={options.length <= 1}>
            Remove option
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={addOption}
            disabled={options.length >= ALL_OPTIONS.length}
          >
            Add option
          </Button>
        </Flex>
      </Flex>
    );
  },
};

export const WithResponsiveIcons: Story = {
  render: () => (
    <SegmentedControl defaultValue={['gas']} size={{ mobile: 'sm', desktop: 'md' }}>
      <SegmentedControlOption
        value="gas"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <GasMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <GasSmallIcon />
            </Box>
          </>
        }
      >
        Gas
      </SegmentedControlOption>
      <SegmentedControlOption
        value="electricity"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <ElectricityMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <ElectricitySmallIcon />
            </Box>
          </>
        }
      >
        Electricity
      </SegmentedControlOption>
    </SegmentedControl>
  ),
};
