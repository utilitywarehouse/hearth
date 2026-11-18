# Hearth React

The React component library of the Hearth design system. It gives product teams ready-made, token-styled UI components with a consistent API.

## Language

### Styling

**Colour scheme**:
A named palette that sets a component's whole colour treatment, whether it conveys meaning (for example danger) or identifies a brand or service (for example energy). Each component accepts its own set of colour schemes.
_Avoid_: Theme, colour variant

**Variant**:
The structural look of a component, such as solid, outline or ghost. Independent of size and colour scheme, which are separate axes.
_Avoid_: Style, type, kind

**Size**:
The scale of a component, independent of its variant and colour scheme. Can differ by breakpoint.
_Avoid_: Variant (for scale)

**Status colour scheme**:
A colour scheme for a state the user reads, such as an alert or progress outcome: positive, danger, warning, info.
_Avoid_: Success (as a name for the scheme)

**Action colour scheme**:
A colour scheme for what an action does when the user takes it, such as on a button or menu item: affirmative, destructive.
_Avoid_: Positive or danger on actions
