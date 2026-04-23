# ContactDetailsForm — Assumptions

No live user was available during development. The following assumptions were made
for a Utility Warehouse customer-facing web product.

---

## Stack

| Decision | Choice | Reason |
|---|---|---|
| Language | TypeScript + React | UW standard; confirmed in brief |
| CSS approach | Plain CSS (one `.css` file) | Minimal custom styles needed; Hearth handles the rest via style props |
| Form library | React Hook Form (`Controller` pattern) | Specified in brief; matches the Hearth forms reference exactly |
| Test runner | Vitest + React Testing Library | Standard in the Hearth monorepo |

---

## Viewports

Mobile-first responsive layout. The submit button row switches from `column`
(full-width on mobile) to `row` (right-aligned on tablet/desktop) using
Hearth's responsive `direction` and `justifyContent` props on `<Flex>`.

---

## Accessibility

- WCAG 2.1 AA target.
- `<fieldset>` / `<legend>` used for two logical groups ("Personal information"
  and "Communication preferences") so screen readers announce the group name
  before each field.
- `noValidate` on `<form>` disables browser-native validation bubbles; all
  validation is handled inline via React Hook Form + Hearth `validationStatus` /
  `validationText` props, which wire `aria-invalid` and `aria-errormessage`
  automatically.
- Form has an `aria-label` so it is identifiable as a landmark when embedded
  inside a larger page.

---

## Validation rules

| Field | Rule |
|---|---|
| Full name | Required; minimum 2 characters |
| Email address | Required; must match `[^\s@]+@[^\s@]+\.[^\s@]+` |
| Phone number | Required; must match UK format (`0` prefix, 10–11 digits, spaces/hyphens allowed) |
| Contact method | Required; one of `email`, `sms`, `post` |

Validation fires `onTouched` (i.e. after the user leaves a field for the first
time), which gives immediate inline feedback without being intrusive on first
load.

---

## Save behaviour

- The component accepts an `onSave` prop of type `(values) => Promise<void>`.
- While saving, the submit button enters a `loading` state (built-in Hearth
  spinner + `aria-label="Loading"`).
- On resolution: a dismissible `positive` Alert appears above the form.
- On rejection: a dismissible `danger` Alert appears above the form.
- Dismissing either alert resets status to `idle` so the user can try again.

---

## Component structure

```
ContactDetailsForm/
├── ContactDetailsForm.tsx        Main component
├── ContactDetailsForm.test.tsx   Vitest + RTL unit tests
└── ContactDetailsForm.css        Fieldset/legend browser resets only
```

The component is exported as both a named export (`ContactDetailsForm`) and a
default export for flexibility.

---

## Hearth components used

| Hearth component | Purpose |
|---|---|
| `Flex` | Column layout of form sections, responsive submit row |
| `Heading` | Form title (`h1`) and fieldset legends (`h2`) |
| `TextInput` + `Controller` | Full name, email, phone — inline validation wired via `fieldState` |
| `Select` + `SelectItem` | Preferred contact method dropdown |
| `Button` | Submit — `variant="emphasis" colorScheme="highlight"` with `loading` prop |
| `Alert` | Success (`positive`) and error (`danger`) inline messages |

No `Toast` was used because the success/error state is persistent and
dismissible rather than transient. An inline Alert is more appropriate when the
user may need to read or re-read the outcome before proceeding.

---

## What was not assumed

- No routing or navigation is wired — this is a standalone form component.
- No initial data fetching — the caller passes `defaultValues` if needed.
- No optimistic UI — the form does not clear or reset after a successful save,
  so the user can verify the data that was saved.
