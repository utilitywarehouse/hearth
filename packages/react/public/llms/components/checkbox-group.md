# CheckboxGroup

`CheckboxGroup` provides a set of interactive buttons where multiple options can be selected at a time. The `CheckboxGroup` uses a fieldset to group related `Checkbox` controls. The `CheckboxGroup` is responsible for handling the value, label, helper text, validation, and disabled state, as well as determining the presentation and selection of the items in the list.

```tsx
<Flex asChild>
  <form>
    <CheckboxGroup {...args} name="checkbox-story">
      <CheckboxTile value="1" label="Energy" />
      <CheckboxTile value="2" label="Broadband" />
      <CheckboxTile value="3" label="Mobile" />
      <CheckboxTile value="4" label="Insurance" />
    </CheckboxGroup>
  </form>
</Flex>
```

## Alternatives

- CheckboxGroupRoot: For presenting checkboxes, outside of a fieldset, without label, helper text, or error message.
- RadioGroup: For single-select

## Accessibility

The necessary aria props, such as `aria-labelledby`, `aria-describedby` and
`aria-errormessage` are handled internally, however you can pass these and
other aria props, such as `aria-label`, to the `CheckboxGroup`, `Checkbox` &
`CheckboxTile` components yourself if you need to.

### Keyboard interactions

<Flex direction="column" gap="200" className="sb-unstyled">
  <Flex>
    <Box width="300px">
      <BodyText as="span" weight="bold">
        Key
      </BodyText>
    </Box>
    <BodyText as="span" weight="bold">
      Description
    </BodyText>
  </Flex>
  <Divider />
  {[
    { key: 'Tab', description: 'Moves keyboard focus to the checkbox.' },
    { key: 'Space', description: 'Toggles checkbox between checked and unchecked states.' },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 4 ? <Divider /> : null}
    </>
  ))}
</Flex>

## Helper text

The Checkbox group can display a secondary message as a helper text. While the
checkbox items can also display a helper text, these will not be displayed if
the checkbox group has a helper text.

```tsx
<CheckboxGroup {...args}>
  <CheckboxTile value="1" label="Rap" helperText="Including Grime" />
  <CheckboxTile value="2" label="Rock" helperText="Including Heavy Metal" />
  <CheckboxTile value="3" label="Folk" helperText="Including World music" />
  <CheckboxTile value="4" label="Dance" helperText="Including House music" />
</CheckboxGroup>
```

## Validation

You can display validation status using the `validationStatus` & `validationText` props.
While the checkbox items can also display a validation text, these will not be
displayed if the checkbox group has a validation text.

```tsx
<CheckboxGroup
  {...args}
  value={selected}
  onValueChange={setSelected}
  validationStatus={selected.length < 2 ? 'invalid' : undefined}
>
  <CheckboxTile value="1" label="Bear" />
  <CheckboxTile value="2" label="Koala" />
  <CheckboxTile value="3" label="Wolf" />
  <CheckboxTile value="4" label="Horse" />
  <CheckboxTile value="5" label="Chicken" />
  <CheckboxTile value="6" label="Peacock" />
</CheckboxGroup>
```

By default, the validation text is placed above the checkbox items. Use `validationPlacement="bottom"` to display it below instead.

```tsx
<Flex direction="column" gap="400">
  <CheckboxGroup
    label="Validation top (default)"
    validationStatus="invalid"
    validationText="Please select at least one option"
    validationPlacement="top"
  >
    <CheckboxTile value="1" label="Bear" />
    <CheckboxTile value="2" label="Koala" />
    <CheckboxTile value="3" label="Wolf" />
  </CheckboxGroup>
  <CheckboxGroup
    label="Validation bottom"
    validationStatus="invalid"
    validationText="Please select at least one option"
    validationPlacement="bottom"
  >
    <CheckboxTile value="1" label="Bear" />
    <CheckboxTile value="2" label="Koala" />
    <CheckboxTile value="3" label="Wolf" />
  </CheckboxGroup>
</Flex>
```

## Content width

The width of the `CheckboxGroup` should be set by the parent layout, however it is
possible to independently set the width of the children using `contentWidth`
prop.

By default it will set the width of the children to fit their content, however
you can set it to a specific width, or to `100%` to take up the full width of
the `CheckboxGroup`.

This is a responsive property, so you are able to set different widths for
different breakpoints.

```tsx
<CheckboxGroup {...args} helperText="Setting the width of the children elements">
  <CheckboxTile value="1" label="One" />
  <CheckboxTile value="2" label="Two" />
  <CheckboxTile value="3" label="Three" />
</CheckboxGroup>
```

## Controlled

A controlled value can be provided using the value prop, which accepts a string
array, corresponding to the value props of each child `Checkbox`. The
`onValueChange` event is fired when the user selects or deselects a `Checkbox`
child of the group.

```tsx
<CheckboxGroup
  label="Controlled"
  helperText={`Checked: ${value.join(', ')}`}
  defaultValue={value}
  onValueChange={v => setValue(v)}
>
  <CheckboxTile value="1" label="One" />
  <CheckboxTile value="2" label="Two" />
  <CheckboxTile value="3" label="Three" />
</CheckboxGroup>
```

## API

This component is based on the `fieldset` element and supports the following common props:

- Margin

| Prop                  | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`               | `ReactNode`                                                                                                                                                                                                | —       | The label for the formfield group. This should contain the question being answered by the formfield group. If you don't include a label you need to ensure you use the `aria-label` or `aria-labelledby` prop to properly associate a label with the formfield group. |
| `name`                | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                       |
| `required`            | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                                                                                                                                       |
| `disabled`            | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                                                                                                                                       |
| `defaultValue`        | `string[]`                                                                                                                                                                                                 | —       |                                                                                                                                                                                                                                                                       |
| `value`               | `string[]`                                                                                                                                                                                                 | —       |                                                                                                                                                                                                                                                                       |
| `onValueChange`       | `((value: string[]) => void)`                                                                                                                                                                              | —       |                                                                                                                                                                                                                                                                       |
| `direction`           | `"column" \| "row"`                                                                                                                                                                                        | —       | The direction of the checkboxes, will also set the aria-orientation value.                                                                                                                                                                                            |
| `contentWidth`        | `Responsive<string>`                                                                                                                                                                                       | —       | Set the container width of the CheckboxGroup children, independent to the width of the parent CheckboxGroup.                                                                                                                                                          |
| `labelVariant`        | `"body" \| "heading"`                                                                                                                                                                                      | —       | Set the label variant                                                                                                                                                                                                                                                 |
| `helperText`          | `ReactNode`                                                                                                                                                                                                | —       | Helper text for the formfield group. Provides a hint such as specific requirements for what to choose. When displayed, child components should not display their own `helperText`.                                                                                    |
| `validationText`      | `ReactNode`                                                                                                                                                                                                | —       |                                                                                                                                                                                                                                                                       |
| `validationStatus`    | `"valid" \| "invalid"`                                                                                                                                                                                     | —       |                                                                                                                                                                                                                                                                       |
| `validationPlacement` | `"top" \| "bottom"`                                                                                                                                                                                        | —       |                                                                                                                                                                                                                                                                       |
| `margin`              | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginTop`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginRight`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginBottom`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginLeft`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginX`             | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
| `marginY`             | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                       |
