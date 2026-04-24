# Forms & Inputs

## Text inputs

- [TextInput](TextInput.md) — standard text input with label, helper text, validation, and InputSlot
- [TextArea](TextArea.md) — multi-line text input
- [PasswordInput](PasswordInput.md) — password field with show/hide toggle
- [SearchInput](SearchInput.md) — search field with clear button
- [CurrencyInput](CurrencyInput.md) — £ currency amount input
- [VerificationInput](VerificationInput.md) — OTP/code entry (split digits)
- [DateInput](DateInput.md) — day/month/year split input for known dates

## Selection inputs

- [Select / SelectItem](Select.md) — dropdown for choosing one option
- [Combobox](Combobox.md) — searchable select for many options or async search
- [DatePicker](DatePicker.md) — calendar-based date selection

## Choice groups

- [Checkbox / CheckboxGroup / CheckboxTile](Checkbox.md)
- [RadioGroup / RadioTile / RadioCard](RadioGroup.md)
- [Switch](Switch.md)
- [ToggleGroup / ToggleButtonCard](ToggleGroup.md)

## Form conventions

- Submit buttons use `variant="solid"`, secondary actions use `variant="outline"`
- Form actions are left-aligned
- Use `gap="300"` between fields within a section, `gap="400"` between sections
- React Hook Form: use `Controller` + `fieldState.error` for Hearth inputs — see individual component files for examples
