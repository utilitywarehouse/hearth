---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `ToggleGroup` manages selection for a set of `ToggleButton`s or `ToggleButtonCard`s

`ToggleGroup` matches the React package's `ToggleGroup`. Set `type="single"`
to allow one selection, or `type="multiple"` (the default) to allow any
number. Use `value`, `defaultValue` and `onValueChange` to read and set the
selection: a `string` in `single` mode and a `string[]` in `multiple` mode.
`ToggleGroup` also accepts `Flex` layout props, such as `gap` and `direction`.

```tsx
<ToggleGroup type="single" defaultValue="monthly" gap="200">
  <ToggleButton value="monthly" text="Monthly" />
  <ToggleButton value="annually" text="Annually" />
</ToggleGroup>
```

`ToggleButton` has a new `value` prop that identifies it inside a group, and
`ToggleButtonCard`'s existing `value` prop now also works with `ToggleGroup`.
Inside a group, the group sets each child's toggled state. Outside a group,
both components work as before. `ToggleButtonCardGroup` is unchanged.

`ToggleButton` is now exported from the package. It was documented, but the
package index did not export it.

On web, `ToggleButton` now sets `aria-pressed`, or `aria-checked` in a
`type="single"` group, so screen readers announce its state. Before, web
exposed no toggled state. In a `type="single"` group, the buttons have the
`radio` role and the group has the `radiogroup` role, on all platforms.

**Components affected**:

- `ToggleGroup` (new)
- `ToggleButton`
- `ToggleButtonCard`

**Developer changes**:

No changes are needed. To let a group manage selection, wrap your buttons or
cards in a `ToggleGroup` and give each one a unique `value`.
