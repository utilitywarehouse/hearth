# Review: `src/components/DeleteConfirmModal.tsx`

Reviewed against the `hearth-react-review` checklist (compound-component
usage, layout/token rules, accessibility, hallucinated-prop check). Every
Hearth prop/component referenced below was verified against the live
`hearth-react` MCP docs (`docs-show` for `Modal`, `Button`, `Box`, `Heading`)
before being flagged or cleared — nothing here is from memory or local
inspection alone.

## Tier 1 — Blocking

1. **`Modal` is imported but never composed — the whole dialog is hand-rolled.**
   The component imports `Modal` from `@utilitywarehouse/hearth-react` but
   never renders it; instead it builds its own overlay with a raw
   `<div style={{ position: 'fixed', inset: 0, ... }}>`. Per the `Modal` docs,
   `ModalRoot`/`Modal`/`ModalFooter`/`ModalClose` together provide portal
   rendering, focus trapping, Escape-to-close, a WAI-ARIA `dialog` role, and
   reduced-motion-aware enter/exit animation. None of that exists on the
   hand-rolled version: there's no `role="dialog"`/`aria-modal`, no focus
   trap (keyboard users can tab straight through into the page behind it),
   and no Escape-key handling. This is exactly the "compound-component
   sub-components skipped/replaced with ad-hoc markup" case the review
   checklist calls out, and it's also a real accessibility regression, not
   just a style miss. The unused `Modal` import will also fail
   `lint:js --max-warnings 0`.
   **Fix:** compose `ModalRoot` (controlled via `open`/`onOpenChange`, or
   uncontrolled with a `ModalTrigger`) wrapping `Modal` with `heading`/
   `description`, and `ModalFooter` with two `ModalClose`-wrapped `Button`s,
   per the `Playground`/`Default Open` stories.

2. **`<a href="#" onClick={onConfirm}>` wrapping the Delete `Button` — invalid HTML and a live navigation bug.**
   This nests one interactive element inside another (`<button>` inside
   `<a>`), which is invalid HTML. It's also a functional bug: the anchor's
   `onClick` fires `onConfirm`, but nothing calls `preventDefault()`, so the
   browser will *also* follow `href="#"` — jumping the page to the top /
   pushing a `#` history entry every time a user confirms a delete. There's
   no navigation target here at all, so per the `Button` docs ("For actions
   that navigate somewhere, use a link instead, or render Button `asChild`
   with an anchor") this isn't a link scenario in the first place — it's a
   plain action button. Drop the `<a>` and put `onClick={onConfirm}` directly
   on the `Button`.

3. **`padding={{ tablet: '300' }}` on the outer `Box` has no `mobile` key.**
   Responsive props are mobile-first and don't cascade down — an object
   without `mobile` applies nothing at mobile width. This `Box` will render
   with **zero padding at mobile**, which is the viewport a confirmation
   modal is most likely to be viewed at. Needs `padding={{ mobile: '200', tablet: '300' }}` (or whatever value the design actually specifies).

## Tier 2 — Should fix

4. **Cancel is a raw `<button>`, not Hearth's `Button`.** Every documented
   `Modal` footer example (`Playground`, `Default Open`, etc.) pairs
   `ModalClose` with a Hearth `Button` (`variant="ghost" colorScheme="functional"`
   for Cancel). The raw `<button>` here gets none of Hearth's focus states,
   sizing, or typography — it visually and behaviourally diverges from every
   other modal in the app.

5. **Delete button has `variant="solid"` but no `colorScheme`.** `Button`'s
   own docs describe a dedicated `colorScheme="destructive"` story for
   "actions that delete or remove something" — exactly this case. As written
   it renders with whatever the default colour scheme is, which undercuts
   the "this is dangerous" signal a delete confirmation is supposed to give.

6. **Backdrop uses a raw inline style (`background: 'rgba(0,0,0,0.5)'`) instead of a token.** Bypasses the token system with a hardcoded RGBA value. This becomes moot once `Modal` is adopted (finding 1 removes the hand-rolled backdrop entirely), but flagging it as a standalone token-misuse instance in case any custom overlay code is kept.

## Tier 3 — Nice to have

7. **Prefer `Modal`'s own `heading`/`description` props over manual `Heading`+`BodyText`.** Once composed via `Modal`, pass `heading="Delete this item?"` and `description="This action cannot be undone."` directly — the docs recommend this for "standard content" since it guarantees consistent spacing/alignment with every other modal, rather than hand-laying-out typography components as children.

## Not flagged (verified correct)

- `Heading as="h2"` — explicit `as` is set correctly per the accessibility
  rule ("Always set `as` on `Heading`"); no gap here even though `h2` is also
  the default.
- `Flex gap="200"` — valid spacing token, correct use of `gap` over margin
  for spacing siblings.
- `Box backgroundColor="primary"` — a real, documented `Box` prop value (not
  hallucinated).

## Suggested fix order

Tackle Tier 1 as one pass (items 1–3 are tightly coupled — adopting `Modal`
properly resolves most of the accessibility/backdrop concerns at once), then
Tier 2 in the same pass since it's the natural place to set `Button` variants/
colour schemes while rebuilding the footer. Re-run `docs-show` for `Modal`
and `Button` again at that point rather than relying on this review's
snapshot, per the review skill's fix workflow.
