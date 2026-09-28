# Notes

No `colour`/`colorScheme` prop was added to either button. The design context
lists only `variant` for each instance (`"solid"` for Confirm, `"outline"` for
Cancel) and states explicitly that no colour/colorScheme variable is bound to
either node. The visual difference described in the screenshot (Cancel
looking lighter/muted) is attributed to how the `outline` variant renders
against the background, not to a separate colour binding — so it's not
something to encode as a prop. Implemented exactly what's specified: no more,
no less.
