---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Pagination` and `Tabs` buttons submit a surrounding form

`Pagination`'s page and navigation buttons, `TabsList`'s scroll buttons and
`DatePicker`'s calendar header buttons had no `type`, so they defaulted to
`type="submit"`. Inside a `form`, clicking them submitted it. For `DatePicker`
this only applied when the calendar renders inside the form (for example with
`inline`), as it's portaled out of it by default. They now have
`type="button"`.

**Components affected**:

- `Pagination`
- `Tabs`
- `DatePicker`

**Developer changes**:

No changes required.
