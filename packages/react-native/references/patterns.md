# Common patterns and gotchas

## Icon next to wrapping body text

A `Text`/`BodyText` inside a `direction="row"` `Flex` lays out at its intrinsic
single-line width and overflows instead of wrapping (a React Native flexbox
gotcha, easy to miss when translating from web). Give it `flex: 1` (or
`flexShrink: 1`, or wrap it in a `Box`), and use `align="flex-start"` rather
than `"center"` once it can span lines.

```tsx
<Flex direction="row" align="flex-start" gap="100">
  <CheckIcon />
  <BodyText style={{ flex: 1 }}>{longWrappingCopy}</BodyText>
</Flex>
```

## Interactive rows render their own trailing chevron

`ListItem` renders a trailing `ChevronRightSmallIcon` whenever `onPress` is set
and `trailingContent` is omitted; passing
`trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}` is
redundant. `CardAction` defaults its trailing icon to `ChevronRightSmallIcon`
unless `trailingContent` is supplied. Only pass `trailingContent` for a
different element (`Switch`, `Link`, custom icon). A Figma screenshot can't
tell you whether the component renders it: check the component docs before
replicating behaviour driven by props like `onPress`.

## Themed images for light/dark mode

Source of truth: `public/llms/docs/dark-mode-best-practice.md`.

```tsx
<ThemedImage light={require('./logo-light.png')} dark={require('./logo-dark.png')} />
```

## Full-width button on mobile, auto-width on larger screens

Control width with the parent layout, not a `Button` prop.

```tsx
<Flex direction="column" align={{ base: 'stretch', md: 'flex-start' }}>
  <Button variant="solid" colorScheme="highlight">Submit</Button>
</Flex>
```

## Accessibility detail

- `Heading` always sets `accessibilityRole="header"`; don't override what
  Hearth wires.
- Inputs inside `FormField` already combine label, helper text and
  required/invalid state via `useFormFieldAccessibility`: don't hand-roll
  `accessibilityLabel`/`accessibilityHint`.
- Use `accessibilityState={{ checked, disabled }}` on toggle-like components.

## Compound components

`Card` → `CardContent`, `CardActions`, `CardAction*`, `CardPressHandler`;
`Accordion` → `AccordionItem`, `AccordionTrigger`, `AccordionHeader`,
`AccordionContent`; `FormField` → `FormFieldLabel`, `FormFieldHelper`,
`FormFieldValid`, `FormFieldInvalid`. State is shared via a
`<Component>Context` (check for a `useXContext` export).
