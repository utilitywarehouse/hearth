# Review: `AccountSummaryCard.tsx`

Scope: `src/components/AccountSummaryCard.tsx` (evaluated at
`plugins/hearth-ai-toolkit/skills/hearth-react-review/evals/files/AccountSummaryCard.tsx`).
Reviewed per the `hearth-react-review` skill against `packages/react/SKILL.md`
("hearth-react") and the `hearth-react` MCP `docs-list`/`docs-show` tools. Every
component and prop below was re-verified against live docs rather than assumed
correct because it was already in the code.

Findings are grouped by tier per the skill's prioritisation. Nothing has been
changed — this is a report only.

---

## Tier 1 — Blocking

**1. `shadow="lg"` on `Card` (line 12) is a hallucinated prop.**
`docs-show` on `components-card` confirms `Card`'s real prop set has no
`shadow` prop at all — only `shadowColor` (`"brand" | "mobile" | "functional" |
"energy" | "broadband" | "insurance" | "cashback" | "pig"`), which changes the
colour of the card's shadow, not its size. `shadow="lg"` will be spread onto
the DOM as an unrecognised attribute (a React warning) and has no visual
effect. If a shadow is actually wanted, use `shadowColor` (there's a dedicated
"Shadow Colours" story: `components-card--shadow-colours`); otherwise drop the
prop.

**2. Missing `direction="column"` on `CardContent` (line 13) — content will likely render as a row, not stacked.**
`CardContent` shares the same flex-container prop shape as `Flex`, and its
`direction` prop defaults to `"row"` per `docs-show`. Every real example
(`components-card-cardcontent--playground`, `components-card--with-long-text`)
explicitly passes `direction="column"`. As written, the `Heading`, both `Flex`
rows, and the pay-now `Box` are siblings inside a row-direction flex
container, so they'll lay out side-by-side instead of stacked top-to-bottom.
This looks like it would visibly break the card's layout, not just be
suboptimal.

**3. `Heading` (line 14) has no `as` prop.**
Per the Accessibility rules in `packages/react/SKILL.md`: "Always set `as` on
`Heading` for correct semantic hierarchy." It happens to default to `h2`, but
that's incidental to this file — the correct heading level depends on where
`AccountSummaryCard` is mounted in the surrounding page's outline, and Hearth
doesn't wire that automatically. Set it explicitly (e.g. `as="h2"` or `h3`)
based on where this card sits.

---

## Tier 2 — Should fix

**4. `style={{ padding: '16px' }}` on `Card` (line 12) — raw px value, and `Card` has no token `padding` prop to begin with.**
`docs-show` confirms `Card`'s prop set has no generic `padding` — only
`paddingNone` (a boolean to remove the card's own default padding). This
inline style isn't overriding a token-based prop, it's fighting Card's
built-in default padding directly with a raw pixel value bypassing the token
system entirely. Drop it and rely on the card's default padding, or use
`paddingNone` if a flush card is genuinely needed.

**5. `style={{ backgroundColor: 'var(--h-surface-highlight-subtle)' }}` on `Box` (line 23) — CSS variable string used in TSX.**
Per "Browser tokens in JS/TS, CSS variables in CSS" in `packages/react/SKILL.md`:
CSS custom‑property strings should only appear in `.css` files. In TSX, import
the equivalent value from `@utilitywarehouse/hearth-tokens/browser` (e.g.
`semantic.surface.highlight.subtle`) and pass it through the `backgroundColor`
style prop.

**6. `<BodyText marginRight="100">Balance</BodyText>` (line 16) — margin on a sibling instead of `gap` on the parent.**
This is the exact anti-pattern called out in `packages/react/SKILL.md`
("Use layout components"). Move the spacing to the `Flex` wrapper:
`<Flex gap="100">`.

**7. Second `Flex` (icon + "Payment due" text, lines 19–22) has no `gap` at all.**
The `WarningMediumIcon` and the `BodyText` will render flush against each
other with no space. Add a small `gap` (e.g. `"50"`), matching the pattern
used in Hearth's own `CardContent` examples (`<Flex gap="50" alignItems="center">`).

**8. `<Button marginLeft="auto">` (line 24), wrapped in a plain `Box` — margin-hack for alignment.**
This is the second anti-pattern example from the same skill section, applied
almost verbatim: margin used to push an element to one side instead of
`justifyContent` on a `Flex` wrapper. Use `<Flex justifyContent="flex-end">`
(or `space-between` if pairing the button with other content) instead of
`marginLeft="auto"` on the `Button` itself.

**9. No `spacing`/`gap` set on `CardContent`.**
Once `direction="column"` is added (finding 2), the heading, balance row,
due-date row, and button will still have no space between them — Hearth
doesn't add this by default. Every real `CardContent` example sets a
`spacing` (e.g. `spacing="lg"`) or responsive `gap`.

---

## Tier 3 — Nice to have

**10. `Button` (line 24) sets neither `variant` nor `colorScheme`.**
Every documented `Button` story sets both explicitly, and for a primary CTA
like "Pay now" the convention is `variant="solid" colorScheme="highlight"`.
Worth confirming intent — as written it relies on whatever the component's
unstated default renders as.

**11. Plain `Button` CTA inside an ad-hoc `Box`, rather than `CardActions`.**
Card's documented action-composition pattern pairs `CardContent` with
`CardActions` (containing `CardActionButton`/`CardActionLink`). That said,
`CardActionButton`'s actual shape (`heading` + optional `helperText`/`badge`,
with a chevron by default) is a navigational-row pattern, not a generic CTA
button — it doesn't map cleanly onto a "Pay now" button. A standalone `Button`
may genuinely be the right call here; flagging only so it gets a second look
against the Figma design rather than being assumed correct.

**12. `WarningMediumIcon` (line 20) has no `title`/`titleId`.**
Per `hearth-react-icons`' own type definitions, icons default to
`aria-hidden="true"` unless `title`/`titleId` are supplied. Since the adjacent
`BodyText` ("Payment due {dueDate}") already conveys the same information,
the default decorative/aria-hidden behaviour is probably correct as-is. Only
add a `title`/`titleId` if the icon is meant to convey something (e.g.
"overdue"/urgency) that isn't otherwise present in the text.

---

## Verification notes

- Confirmed via `mcp__hearth-react__docs-show`: `components-card` (props),
  `components-card-cardcontent` (props), `layout-flex` (props, shared shape
  with `Card`/`CardContent`), `typography-heading`, `typography-bodytext`,
  `components-button`, `components-card-cardactions`,
  `components-card-cardactionbutton`, `components-iconbutton--docs`,
  `components-alert--docs`.
- `components-card--docs` timed out (504) on the MCP server and wasn't
  retried since the plain `components-card` entry already surfaced the full
  prop list and stories needed to verify `shadow`/`shadowColor` and the
  `padding`/`paddingNone` question.
- `hearth-react-icons` isn't covered by the `hearth-react` MCP server (that
  server only documents `@utilitywarehouse/hearth-react`). Its `title`/
  `titleId`/default-`aria-hidden` behaviour was verified by reading the
  package's own shipped type declarations
  (`packages/react-icons/dist/types.d.ts`) rather than assumed from naming
  convention.

## Not changed

Per the skill's report-and-fix workflow, this is a review only — nothing in
`AccountSummaryCard.tsx` has been edited. Let me know which tier to start
fixing from and I'll work through it smallest-safe-group-first.
