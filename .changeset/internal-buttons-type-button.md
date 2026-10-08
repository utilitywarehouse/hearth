---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Pagination` and `Tabs` buttons submit a surrounding form

`Pagination`'s page and navigation buttons, `TabsList`'s scroll buttons and
`DatePicker`'s month/year navigation buttons had no `type`, so they defaulted
to `type="submit"`. Inside a `form`, clicking them submitted it. They now
have `type="button"`.

**Components affected**:

- `Pagination`
- `Tabs`
- `DatePicker`

**Developer changes**:

No changes required.
