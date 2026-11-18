# Hearth React

The React component library of the Hearth design system. It gives product teams ready-made, token-styled UI components with a consistent API.

## Language

### Styling

**Colour scheme**:
A named palette that sets a component's whole colour treatment, whether it conveys meaning (for example danger) or identifies a brand or service (for example energy). Each component accepts its own set of colour schemes.
_Avoid_: Theme, colour variant

**Status colour scheme**:
A colour scheme for a state the user reads, such as an alert or progress outcome: positive, danger, warning, info.
_Avoid_: Success (as a name for the scheme)

**Action colour scheme**:
A colour scheme for what an action does when the user takes it, such as on a button or menu item: affirmative, destructive.
_Avoid_: Positive or danger on actions

**Variant**:
The structural look of a component, such as solid, outline or ghost. Independent of size and colour scheme, which are separate axes.
_Avoid_: Style, type, kind

**Size**:
The scale of a component, independent of its variant and colour scheme. Can differ by breakpoint.
_Avoid_: Variant (for scale)

**Style prop**:
A prop shared across components that sets one visual aspect, such as margin, padding, gap, colour, size or border, using design token values.
_Avoid_: Common prop, utility prop

### Responsiveness

**Breakpoint**:
A named viewport range at which responsive and adaptive props change: mobile, tablet, desktop or wide.
_Avoid_: Screen size, media query (for the name)

**Responsive prop**:
A style prop that accepts a separate value for each breakpoint, set by the caller.
_Avoid_: Adaptive prop (for props that vary by breakpoint without caller input)

**Adaptive prop**:
A prop whose result changes across breakpoints by itself, with no per-breakpoint value from the caller. `spacing` is one.
_Avoid_: Responsive prop

### Layout

**Layout primitive**:
One of the building blocks other layouts are composed from: Box, Flex, Grid or Container. Each accepts style props.
_Avoid_: Layout component, layout element

### Component structure

**Compound component**:
A component made of several exported parts that the caller assembles, such as Accordion with its item, header, trigger and content.
_Avoid_: Composite component, multi-part component

**Part**:
One exported piece of a compound component, such as the Accordion's item or the Modal's trigger.
_Avoid_: Sub-component, child component

**Base component**:
An internal component that shares behaviour or structure between public components, such as the one under every button. It is not exported and has no docs or stories.
_Avoid_: Abstract component, primitive (reserved for layout)
