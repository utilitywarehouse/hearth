# Timeline

Use Timeline to show a sequence of events or steps, each rendered as a
`TimelineItem`, in the order they occur. Use the `progress` variant when
the sequence represents the user's advancement through it; use `static`
for a purely informational history or schedule. For a multi-step process
the user actively navigates, use ProgressStepper instead.

- [Usage](#usage)
- [Variants](#variants)
- [States](#states)
- [Accessibility](#accessibility)
- [API](#api)

```tsx
<Flex direction="column" gap="400">
  {variants.map(variant => (
    <Timeline key={variant} variant={variant}>
      <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
      <TimelineItem state="active" label="First payment due" helperText="1 April 2026" />
      <TimelineItem state="incomplete" label="Final payment due" helperText="1 June 2026" />
    </Timeline>
  ))}
</Flex>
```

## Usage

Wrap one or more `TimelineItem` components in a `Timeline`. Each item needs a
`label` and a `state`; `helperText` and `children` are optional for
supporting detail such as a date or amount.

```tsx
<Timeline {...args}>
  <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
  <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026" />
  <TimelineItem state="active" label="Second payment due" helperText="1 June 2026" />
  <TimelineItem state="incomplete" label="Final payment due" helperText="1 July 2026" />
</Timeline>
```

```tsx
<Timeline>
  <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
  <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026" />
  <TimelineItem state="active" label="Second payment due" helperText="1 June 2026" />
  <TimelineItem state="incomplete" label="Final payment due" helperText="1 July 2026" />
</Timeline>
```

## Variants

`variant` controls the size of each item's indicator:

- `static` — a small dot, for a purely informational history or schedule.
- `progress` — a larger circle that can carry a complete icon, for a
  sequence the user is advancing through.

```tsx
<Timeline {...args}>
  <TimelineItem state="complete" label="Order placed" helperText="12 January 2026" />
  <TimelineItem state="complete" label="Order dispatched" helperText="13 January 2026" />
  <TimelineItem state="incomplete" label="Order delivered" helperText="Estimated 15 January 2026" />
</Timeline>
```

```tsx
<Timeline {...args}>
  <TimelineItem state="complete" label="Application submitted" helperText="12 January 2026" />
  <TimelineItem state="complete" label="Documents verified" helperText="14 January 2026" />
  <TimelineItem state="incomplete" label="Final approval" />
</Timeline>
```

A realistic schedule, mixing `helperText` with `children` for extra
per-item content:

```tsx
<Timeline {...args}>
  <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026">
    <DetailText>£45.00 collected</DetailText>
  </TimelineItem>
  <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026">
    <DetailText>£45.00 collected</DetailText>
  </TimelineItem>
  <TimelineItem state="active" label="Second payment due" helperText="1 June 2026">
    <DetailText>£45.00 due</DetailText>
  </TimelineItem>
  <TimelineItem state="incomplete" label="Final payment due" helperText="1 July 2026">
    <DetailText>£45.00 due</DetailText>
  </TimelineItem>
</Timeline>
```

## States

Each `TimelineItem` has one of three states:

- `complete`
- `active`
- `incomplete`

State is expressed purely through the indicator and connector styling —
there is no separate variant prop on `TimelineItem` itself.

## API

This component is based on the `ol` element and supports the following
common props:

- Margin

| Prop           | Type                                                                                                                                                                                                       | Default  | Description                                                                                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `"progress" \| "static"`                                                                                                                                                                                   | `static` | Controls the size of each `TimelineItem`'s indicator — `static` renders a small dot, `progress` renders a larger circle that can carry a complete icon. |
| `margin`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin` CSS property on all sides of the element.                                                                                  |
| `marginTop`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-top` CSS property.                                                                                                          |
| `marginRight`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-right` CSS property.                                                                                                        |
| `marginBottom` | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-bottom` CSS property.                                                                                                       |
| `marginLeft`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-left` CSS property.                                                                                                         |
| `marginX`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-left` and `margin-right` CSS properties.                                                                                    |
| `marginY`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        | Sets the responsive `margin-top` and `margin-bottom` CSS properties.                                                                                    |

### TimelineItem API

This component is based on the `li` element.

| Prop         | Type                                     | Default | Description                                                                  |
| ------------ | ---------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `label`      | `string`                                 | —       | The label text to display for this item.                                     |
| `helperText` | `string`                                 | —       | Optional supporting text to display below the label.                         |
| `state`      | `"complete" \| "active" \| "incomplete"` | —       | The current state of this item, driving the indicator and connector styling. |
