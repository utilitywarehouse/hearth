import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BroadbandMediumIcon,
  BroadbandSmallIcon,
  CashbackCardMediumIcon,
  CashbackCardSmallIcon,
  ElectricityMediumIcon,
  ElectricitySmallIcon,
  GasMediumIcon,
  GasSmallIcon,
  InsuranceMediumIcon,
  InsuranceSmallIcon,
  MobileMediumIcon,
  MobileSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { Box } from '../Box/Box';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlOption } from './SegmentedControlOption';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components / SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    size: 'sm',
    defaultValue: ['option-1'],
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/**
 * Visual matrix of all size and state combinations used for snapshot testing and docs.
 * Each variation is labelled. Not intended as a usage reference — see individual stories instead.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: { controls: { hideNoControlsWarning: true }, chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="400">
      <BodyText as="p" size="md" weight="semibold">
        SM — labels
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1" label="Label" />
        <SegmentedControlOption value="option-2" label="Label" />
        <SegmentedControlOption value="option-3" label="Label" />
        <SegmentedControlOption value="option-4" label="Label" />
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        MD — labels
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="md">
        <SegmentedControlOption value="option-1" label="Label" />
        <SegmentedControlOption value="option-2" label="Label" />
        <SegmentedControlOption value="option-3" label="Label" />
        <SegmentedControlOption value="option-4" label="Label" />
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        SM — icons + labels
      </BodyText>
      <SegmentedControl defaultValue={['gas']} size="sm">
        <SegmentedControlOption value="gas" label="Gas" icon={<GasSmallIcon />} />
        <SegmentedControlOption
          value="electricity"
          label="Electricity"
          icon={<ElectricitySmallIcon />}
        />
        <SegmentedControlOption value="mobile" label="Mobile" icon={<MobileSmallIcon />} />
        <SegmentedControlOption value="broadband" label="Broadband" icon={<BroadbandSmallIcon />} />
        <SegmentedControlOption value="insurance" label="Insurance" icon={<InsuranceSmallIcon />} />
        <SegmentedControlOption
          value="cashback"
          label="Cashback"
          icon={<CashbackCardSmallIcon />}
        />
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        MD — icons + labels
      </BodyText>
      <SegmentedControl defaultValue={['gas']} size="md">
        <SegmentedControlOption value="gas" label="Gas" icon={<GasMediumIcon />} />
        <SegmentedControlOption
          value="electricity"
          label="Electricity"
          icon={<ElectricityMediumIcon />}
        />
        <SegmentedControlOption value="mobile" label="Mobile" icon={<MobileMediumIcon />} />
        <SegmentedControlOption
          value="broadband"
          label="Broadband"
          icon={<BroadbandMediumIcon />}
        />
        <SegmentedControlOption
          value="insurance"
          label="Insurance"
          icon={<InsuranceMediumIcon />}
        />
        <SegmentedControlOption
          value="cashback"
          label="Cashback"
          icon={<CashbackCardMediumIcon />}
        />
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        Disabled
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm" disabled>
        <SegmentedControlOption value="option-1" label="Label" />
        <SegmentedControlOption value="option-2" label="Label" />
        <SegmentedControlOption value="option-3" label="Label" />
      </SegmentedControl>

      <BodyText as="p" size="md" weight="semibold">
        Per-option disabled
      </BodyText>
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1" label="Label" />
        <SegmentedControlOption value="option-2" label="Label" disabled />
        <SegmentedControlOption value="option-3" label="Label" />
      </SegmentedControl>
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore props such as size and disabled. */
export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: (args: Story['args']) => (
    <SegmentedControl {...args}>
      <SegmentedControlOption value="option-1" label="Option 1" />
      <SegmentedControlOption value="option-2" label="Option 2" />
      <SegmentedControlOption value="option-3" label="Option 3" />
      <SegmentedControlOption value="option-4" label="Option 4" />
    </SegmentedControl>
  ),
};

/**
 * Two sizes are available: `sm` (32px, default) and `md` (48px).
 * The `size` prop is responsive and accepts breakpoint-keyed values.
 */
export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="300" alignItems="start">
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1" label="Option 1" />
        <SegmentedControlOption value="option-2" label="Option 2" />
        <SegmentedControlOption value="option-3" label="Option 3" />
      </SegmentedControl>
      <SegmentedControl defaultValue={['option-1']} size="md">
        <SegmentedControlOption value="option-1" label="Option 1" />
        <SegmentedControlOption value="option-2" label="Option 2" />
        <SegmentedControlOption value="option-3" label="Option 3" />
      </SegmentedControl>
    </Flex>
  ),
};

/**
 * Use the `icon` prop to display an icon before the label.
 * Use the Small icon variant with `size="sm"` and the Medium icon variant with `size="md"`.
 * Either add icons to all options or none — do not mix.
 */
export const WithIcons: Story = {
  render: () => (
    <Flex direction="column" gap="300" alignItems="start">
      <SegmentedControl defaultValue={['gas']} size="sm">
        <SegmentedControlOption value="gas" label="Gas" icon={<GasSmallIcon />} />
        <SegmentedControlOption
          value="electricity"
          label="Electricity"
          icon={<ElectricitySmallIcon />}
        />
        <SegmentedControlOption value="mobile" label="Mobile" icon={<MobileSmallIcon />} />
        <SegmentedControlOption value="broadband" label="Broadband" icon={<BroadbandSmallIcon />} />
        <SegmentedControlOption value="insurance" label="Insurance" icon={<InsuranceSmallIcon />} />
        <SegmentedControlOption
          value="cashback"
          label="Cashback"
          icon={<CashbackCardSmallIcon />}
        />
      </SegmentedControl>
      <SegmentedControl defaultValue={['gas']} size="md">
        <SegmentedControlOption value="gas" label="Gas" icon={<GasMediumIcon />} />
        <SegmentedControlOption
          value="electricity"
          label="Electricity"
          icon={<ElectricityMediumIcon />}
        />
        <SegmentedControlOption value="mobile" label="Mobile" icon={<MobileMediumIcon />} />
        <SegmentedControlOption
          value="broadband"
          label="Broadband"
          icon={<BroadbandMediumIcon />}
        />
        <SegmentedControlOption
          value="insurance"
          label="Insurance"
          icon={<InsuranceMediumIcon />}
        />
        <SegmentedControlOption
          value="cashback"
          label="Cashback"
          icon={<CashbackCardMediumIcon />}
        />
      </SegmentedControl>
    </Flex>
  ),
};

/**
 * When using a responsive `size` prop, swap icon sizes at breakpoints using
 * `Box` display props to show the correct Small or Medium icon at each viewport width.
 */
export const WithResponsiveIcons: Story = {
  render: () => (
    <SegmentedControl defaultValue={['gas']} size={{ mobile: 'sm', desktop: 'md' }}>
      <SegmentedControlOption
        value="gas"
        label="Gas"
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
      />
      <SegmentedControlOption
        value="electricity"
        label="Electricity"
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
      />
      <SegmentedControlOption
        value="mobile"
        label="Mobile"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <MobileMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <MobileSmallIcon />
            </Box>
          </>
        }
      />
      <SegmentedControlOption
        value="broadband"
        label="Broadband"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <BroadbandMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <BroadbandSmallIcon />
            </Box>
          </>
        }
      />
      <SegmentedControlOption
        value="insurance"
        label="Insurance"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <InsuranceMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <InsuranceSmallIcon />
            </Box>
          </>
        }
      />
      <SegmentedControlOption
        value="cashback"
        label="Cashback"
        icon={
          <>
            <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
              <CashbackCardMediumIcon />
            </Box>
            <Box asChild display={{ desktop: 'none' }}>
              <CashbackCardSmallIcon />
            </Box>
          </>
        }
      />
    </SegmentedControl>
  ),
};

/**
 * The entire control can be disabled via the `disabled` prop on `SegmentedControl`,
 * or individual options can be disabled independently via `disabled` on `SegmentedControlOption`.
 */
export const Disabled: Story = {
  render: () => (
    <Flex direction="column" gap="300" alignItems="start">
      <SegmentedControl defaultValue={['option-1']} size="sm" disabled>
        <SegmentedControlOption value="option-1" label="Option 1" />
        <SegmentedControlOption value="option-2" label="Option 2" />
        <SegmentedControlOption value="option-3" label="Option 3" />
      </SegmentedControl>
      <SegmentedControl defaultValue={['option-1']} size="sm">
        <SegmentedControlOption value="option-1" label="Option 1" />
        <SegmentedControlOption value="option-2" label="Option 2" disabled />
        <SegmentedControlOption value="option-3" label="Option 3" />
      </SegmentedControl>
    </Flex>
  ),
};
