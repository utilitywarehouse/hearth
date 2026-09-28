# Review: AccountSummaryCard.tsx

Reviewed using general React / accessibility / design-system judgement only (no
component-library-specific documentation consulted).

## Styling / tokens

1. **Inline `style` bypasses the library's own spacing props.** The component mixes
   two different styling approaches in the same file: prop-based spacing
   (`marginRight="100"`, `marginLeft="auto"`) and raw inline styles
   (`style={{ padding: '16px' }}` on `Card`, `style={{ backgroundColor: 'var(--h-surface-highlight-subtle)' }}`
   on `Box`). If the library exposes spacing/color props (which the `marginRight`/`marginLeft`
   usage suggests it does), prefer those consistently instead of hardcoded `style` objects —
   inline styles skip the design-token scale, won't respond to theme changes (e.g. dark mode,
   density settings), and are easy to drift out of sync with the rest of the system.
2. **Hardcoded `16px`** is a magic number rather than a token reference. Even if a raw
   `style` prop is unavoidable here, the value should come from the same spacing scale the
   rest of the app uses, not a literal pixel value.
3. **Raw CSS variable in `style`** (`var(--h-surface-highlight-subtle)`) — if the component
   library has a themed "surface"/"background" prop that accepts token names, using it
   directly would be safer than referencing the CSS variable by string, which isn't
   type-checked and will silently produce nothing if the variable name is ever renamed.

## Accessibility

4. **Decorative icon not hidden from assistive tech.** `<WarningMediumIcon />` sits next to
   the text "Payment due {dueDate}", which already conveys the meaning. As written, a screen
   reader may announce the icon (via an implicit or default accessible name) redundantly, or
   announce nothing useful. If the icon is purely decorative, it should be marked
   `aria-hidden="true"` (or the equivalent prop the icon component exposes); if it's meant to
   convey urgency/warning semantics on its own, it needs an explicit accessible label.
5. **No explicit heading level.** `<Heading>Account summary</Heading>` doesn't specify a
   level (e.g. `as="h2"` / `level={2}`). Depending on where this card is rendered, an
   uncontrolled default heading level can create a broken/skipped heading hierarchy for
   screen-reader users navigating by headings. Worth confirming the surrounding page context
   and setting an explicit level.
6. **Label/value pairs aren't semantically grouped.** "Balance" and "£{balance}" are two
   separate text nodes laid out with `marginRight`, which is purely visual. Screen readers
   will read them as unrelated text rather than as a labelled value. Consider description-list
   semantics (`<dl>/<dt>/<dd>`) or an equivalent accessible grouping if the library supports
   it, so "Balance" is programmatically associated with its value.
7. **Contrast not verified.** The "Pay now" button sits on a `--h-surface-highlight-subtle`
   background inside the `Box`. Button-on-subtle-background contrast should be checked
   (automated or visually) since "subtle" surfaces are often close in luminance to
   foreground colors — can't confirm from source alone.

## Component API / data handling

8. **`balance: string`** — using a string for a currency amount pushes formatting
   responsibility onto the caller and risks inconsistent formatting (decimals, thousands
   separators) across usages. Consider accepting a `number` and formatting internally with
   `Intl.NumberFormat`, which also avoids the hardcoded `£` literal being wrong for
   non-GBP contexts.
9. **Hardcoded `£` symbol.** If this component (or the app) has any internationalization
   surface, the currency symbol should come from formatting logic, not be baked into the
   JSX.
10. **`dueDate: string`** — same concern as `balance`: an unformatted/raw string leaves date
    formatting to the caller with no guarantee of consistency. A `Date` (formatted inside the
    component) or a documented/expected string format would reduce ambiguity.
11. **No loading/error affordance for `onPayNow`.** If the pay action is asynchronous (likely,
    given it's a payment flow), the button has no disabled/loading state to prevent double
    submission while the request is in flight.

## Minor / consistency

12. No `className`/`data-testid`/ref passthrough — may be intentional, but worth confirming
    against how other cards in the codebase support test hooks and style overrides.

## Summary

The two biggest things worth fixing before opening the PR:
- Replace the two `style={{ ... }}` usages with the library's own spacing/color props (or
  confirm no such props exist) — the mix of prop-based and inline styling is the most visible
  inconsistency in this file.
- Decide whether the warning icon is decorative or meaningful, and hide it from/label it for
  assistive tech accordingly.

The currency/date typing-as-`string` and heading-level points are lower priority but worth a
look if this component will be reused across locales or nested under varying heading depths.
