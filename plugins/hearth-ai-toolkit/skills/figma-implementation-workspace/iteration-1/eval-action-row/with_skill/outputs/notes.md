# Notes

No `colorScheme` prop was added to either button.

The design context for both "Confirm Button" (`variant: "solid"`) and "Cancel
Button" (`variant: "outline"`) has no colour/colorScheme variable bound to
either node. Per the `figma-implementation` skill, a Figma variable's
presence (and name) is the authoritative signal for a prop value — a
rendered pixel difference between instances (e.g. the outline button
looking lighter/muted) is not evidence of a bound variable, it's just how
that variant renders against the background. Since no colour variable is
present in the response for either node, no `colorScheme` was inferred or
added — both buttons use only the specified `variant` prop, matching Hearth
`Button`'s default `colorScheme` behaviour.
