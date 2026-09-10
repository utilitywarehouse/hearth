# Timeline

Use Timeline to show a sequence of events or steps, each rendered as a
`TimelineItem`, in the order they occur. Use the `progress` variant when
the sequence represents the user's advancement through it; use `static`
for a purely informational history or schedule. For a multi-step process
the user actively navigates, use ProgressStepper instead.

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
  <TimelineItem state="complete" label="Plan starts" helperText="Today">
    <BodyText size="md" color="secondary">
      1 Jun 2025
    </BodyText>
  </TimelineItem>
  <TimelineItem
    state="incomplete"
    label="Plan health check"
    helperText="An automatic review 45 days after joining us to make sure your payments line up with how much energy you actually use."
  >
    <BodyText size="md" color="secondary">
      15 July 2025
    </BodyText>
  </TimelineItem>
  <TimelineItem
    state="incomplete"
    label="Annual plan review"
    helperText="We’ll review your full 12-month energy consumption to adjust your regular payments and get you closer to a zero balance."
  >
    <BodyText size="md" color="secondary">
      By May 2026
    </BodyText>
  </TimelineItem>
  <TimelineItem
    state="incomplete"
    label="Next 12-month cycle begins"
    helperText="Your refreshed plan kicks off for the year ahead, with your next automatic review scheduled for May 2027."
  >
    <BodyText size="md" color="secondary">
      1 Jun 2026
    </BodyText>
  </TimelineItem>
</Timeline>
```

`children` can also render a `Card`, for content that needs its own visual
grouping — such as an action the user needs to take:

```tsx
<Timeline {...args}>
  <TimelineItem
    state="complete"
    label="Application started"
    helperText="We have saved your draft"
  />
  <TimelineItem state="active" label="Additional information" helperText="Action needed">
    <Card variant="subtle" direction="column" gap="100">
      <Badge>Required</Badge>
      <BodyText size="sm">Upload proof of address to continue.</BodyText>
    </Card>
  </TimelineItem>
  <TimelineItem state="incomplete" label="Review complete" helperText="Pending" />
</Timeline>
```

## States

Each `TimelineItem` has one of three states:

- `complete`
- `active`
- `incomplete`

State is expressed purely through the indicator and connector styling —
there is no separate variant prop on `TimelineItem` itself.

## Dangling rail

Set `danglingRail` to extend the final item's connector line beyond the
list, fading it to transparent, to suggest the timeline continues beyond
what's shown. It only applies to the `progress` variant, and only takes
effect when the final item's `state` is `incomplete` — a `complete` or
`active` final item never gets a dangling rail, since there's nothing left
to continue into.

```tsx
<Timeline {...args} danglingRail>
  <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
  <TimelineItem state="active" label="First payment due" helperText="1 April 2026" />
  <TimelineItem state="incomplete" label="Ongoing payments" helperText="Monthly" />
</Timeline>
```

## API

This component is based on the `ol` element and supports the following
common props:

- Margin

| Prop           | Type                     | Default  | Description                                                                                                                                                                                                                  |
| -------------- | ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `"progress" \| "static"` | `static` | Controls the size of each `TimelineItem`'s indicator — `static` renders a small dot, `progress` renders a larger circle that can carry a complete icon.                                                                      |
| `danglingRail` | `boolean`                | `false`  | Extends the final `TimelineItem`'s connector line beyond the list, fading it to transparent, to suggest the timeline continues. Only takes effect when `variant` is `progress` and the final item's `state` is `incomplete`. |

### TimelineItem API

This component is based on the `li` element.

| Prop         | Type                                     | Default | Description                                                                  |
| ------------ | ---------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `label`      | `string`                                 | —       | The label text to display for this item.                                     |
| `helperText` | `string`                                 | —       | Optional supporting text to display below the label.                         |
| `state`      | `"complete" \| "active" \| "incomplete"` | —       | The current state of this item, driving the indicator and connector styling. |
