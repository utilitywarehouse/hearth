# ProgressBar

`ProgressBar` displays the progress of a task or process in a linear bar format, with support for different visual states.

```tsx
<Flex direction="column" gap="400" width="600px">
  <ProgressBar {...args} variant="linear" value={args.value || value} />
  <Flex gap="400">
    <ProgressBar {...args} variant="circular" value={args.value || value} size="md" />
    <ProgressBar {...args} variant="circular" value={args.value || value} size="sm" />
  </Flex>
</Flex>
```

## Label

A label is required, this should be clear and descriptive to guide the user.

The `hideLabel` prop will visually hide the label but keep it available for screen readers.

## Variants

Use the `variant` prop to display either a `linear` or `circular` progress bar.

```tsx
<Flex gap="800" backgroundColor="secondary" padding="300" alignItems="center">
  <ProgressBar variant="linear" label="Linear progress bar" value={30} />
  <ProgressBar variant="circular" label="circular" value={30} />
</Flex>
```

## Color scheme

The `colorScheme` prop controls the visual appearance of the progress bar.

- `default` - Use to communicate general progress - This is the most common use case.
- `danger` - Use to alert the user of a negative status, like exceeding a data limit or running out of time.
- `success` - Use to indicate that a goal has been reached or a task is complete. This will also automatically set the value to the maximum.

```tsx
<Flex direction="column" gap="400">
  <ProgressBar variant="linear" label="Upload progress" value={90} />
  <ProgressBar variant="linear" label="Completed tasks" colorScheme="success" value={100} />
  <ProgressBar variant="linear" label="Storage usage" colorScheme="danger" value={10} />
  <Flex gap="400">
    <ProgressBar variant="circular" label="Upload" value={90} />
    <ProgressBar variant="circular" label="Completed" colorScheme="success" value={100} />
    <ProgressBar variant="circular" label="Storage" colorScheme="danger" value={10} />
  </Flex>
</Flex>
```

## Size

The `circular` variant offers a responsive size prop. The label will only be
displayed with the `md` size, with the `sm` size only displaying the value
text.

```tsx
<Flex gap="400" alignItems="center" padding="300" backgroundColor="secondary">
  <ProgressBar variant="circular" label="circular" value={30} />
  <ProgressBar variant="circular" size="sm" label="circular" value={30} />
  <ProgressBar
    variant="circular"
    size={{ mobile: 'sm', desktop: 'md' }}
    label="responsive"
    value={30}
  />
</Flex>
```

## Value

The `value` prop accepts a number between the `min` (default is 0) and the
`max` (default is 100). Values outside this range will be automatically
clamped.

## Value text

The value will also be rendered in a user-friendly format, a percentage by
default. You can override this by passing a function to the `formatValueText`
prop.

```tsx
<ProgressBar
  label="Storage usage"
  value={value}
  max={max}
  formatValueText={(value: number) => `${value / max}GB / ${max}GB`}
/>
```

```tsx
<Flex direction="column" gap="400">
  <ProgressBar
    variant="linear"
    label="Storage usage"
    value={87}
    formatValueText={(value: number) => `${value / 10}GB / 10GB`}
  />

  <ProgressBar
    variant="circular"
    label="files"
    value={15}
    max={50}
    formatValueText={(value: number) => `${value}/50`}
  />
</Flex>
```

For screenreaders, you can also use the `aria-valuetext` prop to provide a
user-friendly name for `aria-valuenow`, the current value of the meter.

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop              | Type                                                                                                                                                                                                       | Default     | Description                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `label`           | `string`                                                                                                                                                                                                   | —           | The required text label. Can be visually hidden with the `hideLabel` prop.            |
| `variant`         | `"linear" \| "circular"`                                                                                                                                                                                   | —           |                                                                                       |
| `colorScheme`     | `"default" \| "success" \| "danger"`                                                                                                                                                                       | `'default'` | Set the visual apearance.                                                             |
| `size`            | `Responsive<"sm" \| "md">`                                                                                                                                                                                 | `md`        | Sets the circular variant size. Does not affect the appearance of the linear variant. |
| `value`           | `number`                                                                                                                                                                                                   | —           | The current progress value.                                                           |
| `min`             | `number`                                                                                                                                                                                                   | `0`         | The minimum value.                                                                    |
| `max`             | `number`                                                                                                                                                                                                   | `100`       | The maximum value.                                                                    |
| `hideLabel`       | `boolean`                                                                                                                                                                                                  | —           | Visually hide the label.                                                              |
| `formatValueText` | `((value: number) => string)`                                                                                                                                                                              | —           | Override the default percentage value label formatting                                |
| `aria-valuetext`  | `string`                                                                                                                                                                                                   | —           | A human-readable text alternative for the current value (`aria-valuenow`).            |
| `margin`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginTop`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginRight`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginBottom`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginLeft`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginX`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
| `marginY`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                       |
