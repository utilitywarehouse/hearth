# PromoBanner — implementation notes

## Spacing variable (layout/spacing/lg)

The frame reported one bound variable on the container's gap, resolving to
24px at desktop and 16px at mobile for the same variable. Since it's a
single design-time variable with breakpoint-dependent values rather than
two separate tokens, I modelled it as one CSS custom property
(`--spacing-lg`) with a `@media (max-width: 767px)` override, instead of
hardcoding either pixel value or picking one arbitrarily. This keeps the
"one variable, responsive value" relationship intact in code and gives a
single place to adjust the breakpoint or values later. 767px is a
placeholder breakpoint — I don't have the design's actual breakpoint token,
so this should be swapped for whatever mobile/desktop breakpoint the real
project uses.

## "Muted subtitle" hidden node

The "Muted subtitle" node ("Limited time only", Body Text SM) has
`hidden: true` in the Figma frame, meaning it isn't part of the currently
visible design. I left it out of the component entirely rather than:
- rendering it with `display: none` (would ship dead markup/text to the
  DOM and to assistive tech for no visible benefit), or
- adding a speculative `subtitle` prop to support toggling it on later.

Reasoning: nothing in the provided context indicates the subtitle is meant
to be conditionally shown by consumers of this component — it's simply
switched off in this Figma frame. Adding a prop for a feature with no
current requirement would be speculative. If a future design calls for a
visible/optional subtitle, that's a small, well-scoped addition to make at
that point (new prop + conditional render), rather than something to guess
at now.
