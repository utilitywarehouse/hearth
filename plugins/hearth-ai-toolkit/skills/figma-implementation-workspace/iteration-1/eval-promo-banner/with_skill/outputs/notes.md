# PromoBanner implementation notes

## (a) `spacing` vs `gap`

Used `spacing="lg"` on the `Flex`, not `gap`.

The `figma-implementation` skill's mechanical check says: if a bound Figma
variable's path contains the segment `spacing` (e.g. `layout/spacing/lg`),
map it to the component's `spacing` prop, never `gap` — regardless of what
the rendered pixel value looks like. `Banner Container`'s gap is bound to
`layout/spacing/lg`, so this is a forced lookup, not a judgement call.

The note that the same variable resolved to 24px on desktop and 16px on
mobile does not change this. Per the skill, the Figma variable's *name*
(`lg`) is authoritative over any rendered pixel value — different
breakpoints resolving the same bound variable to different pixel numbers is
just that variable's own responsive definition doing its job, not evidence
that the component needs a responsive `gap` object with different tiers per
breakpoint. Hearth's `spacing` prop is intentionally non-responsive — it
already encodes a predetermined set of responsive steps per tier — so a
single `spacing="lg"` is the correct, complete mapping for both breakpoints.

## (b) "Muted subtitle" (`hidden: true`)

Omitted it from the implementation entirely — it is not rendered in
`PromoBanner.tsx`.

`hidden: true` in the Figma design context means that layer is switched off
in the design itself (not visible in the frame as designed), so it isn't
part of what should be implemented. Rendering it — even conditionally, or
commented out, or behind a prop no one asked for — would add UI that isn't
in the actual design and would violate YAGNI by inventing a toggle/prop
requirement the ticket never specified. If a future design turns this
subtitle on, that's a new, explicit change to implement then, not something
to speculatively wire up now.
