# SegmentedControl

Use a Segmented Control to switch between alternative views of closely related content.

```tsx
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
    <SegmentedControlOption value="cashback" label="Cashback" icon={<CashbackCardSmallIcon />} />
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
    <SegmentedControlOption value="broadband" label="Broadband" icon={<BroadbandMediumIcon />} />
    <SegmentedControlOption value="insurance" label="Insurance" icon={<InsuranceMediumIcon />} />
    <SegmentedControlOption value="cashback" label="Cashback" icon={<CashbackCardMediumIcon />} />
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
```

- [Usage](#usage)
- [Sizes](#sizes)
- [Icons](#icons)
  - [Responsive icon sizes](#responsive-icon-sizes)
- [When to use](#when-to-use)
- [SegmentedControl API](#segmentedcontrol-api)
- [SegmentedControlOption API](#segmentedcontroloption-api)

## Usage

Wrap `SegmentedControlOption` components in a `SegmentedControl`. Each option requires a unique `value`. Always provide a `defaultValue` — a Segmented Control cannot be used without a selected option.

```tsx
<SegmentedControl defaultValue={['gas']}>
  <SegmentedControlOption value="gas" label="Gas" />
  <SegmentedControlOption value="electricity" label="Electricity" />
</SegmentedControl>
```

```tsx
<SegmentedControl {...args}>
  <SegmentedControlOption value="option-1" label="Option 1" />
  <SegmentedControlOption value="option-2" label="Option 2" />
  <SegmentedControlOption value="option-3" label="Option 3" />
  <SegmentedControlOption value="option-4" label="Option 4" />
</SegmentedControl>
```

## Sizes

Two sizes are available: `sm` (32px, default) and `md` (48px). The `size` prop is responsive and can be used to display different sizes at different breakpoints.

```tsx
<SegmentedControl size={{ mobile: 'sm', desktop: 'md' }} defaultValue={['gas']}>
  ...
</SegmentedControl>
```

## Icons

Use the `icon` prop to display an icon before the label. Use the Small icon variant with `size="sm"` and the Medium icon variant with `size="md"`. Either add icons to all options or none — do not mix.

```tsx
<SegmentedControl defaultValue={['gas']} size="sm">
  <SegmentedControlOption value="gas" label="Gas" icon={<GasSmallIcon />} />
  <SegmentedControlOption value="electricity" label="Electricity" icon={<ElectricitySmallIcon />} />
</SegmentedControl>
```

```tsx
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
    <SegmentedControlOption value="cashback" label="Cashback" icon={<CashbackCardSmallIcon />} />
  </SegmentedControl>
  <SegmentedControl defaultValue={['gas']} size="md">
    <SegmentedControlOption value="gas" label="Gas" icon={<GasMediumIcon />} />
    <SegmentedControlOption
      value="electricity"
      label="Electricity"
      icon={<ElectricityMediumIcon />}
    />
    <SegmentedControlOption value="mobile" label="Mobile" icon={<MobileMediumIcon />} />
    <SegmentedControlOption value="broadband" label="Broadband" icon={<BroadbandMediumIcon />} />
    <SegmentedControlOption value="insurance" label="Insurance" icon={<InsuranceMediumIcon />} />
    <SegmentedControlOption value="cashback" label="Cashback" icon={<CashbackCardMediumIcon />} />
  </SegmentedControl>
</Flex>
```

### Responsive icon sizes

If you need to render different sized icons in conjunction with the responsive `size` prop, use `Box` with display props to show the appropriate icon at each breakpoint.

```tsx
import { GasMediumIcon, GasSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Box, SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react';

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
</SegmentedControl>;
```

```tsx
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
```

## When to use

✅ Use Segmented Control to switch between alternative views of closely related content.

✅ Use when updating or changing a view of content.

❌ Do not use to navigate between content — use [Tabs](/docs/components-tabs--docs) instead.

❌ Do not use as a replacement for [Switch](/docs/components-switch--docs) within forms or settings.
