import type { ComponentPropsWithRef, ReactNode } from 'react';

// Intentionally extends ComponentPropsWithRef<'button'> rather than Toggle.Props from Base UI.
// Toggle.Props adds render (slot customisation), className/style as state callbacks, and
// preventBaseUIHandler on every event handler — none of which Hearth exposes on any other
// component. Keeping the base as a plain button type is consistent with the rest of the library
// and avoids leaking Base UI implementation details into the public API.
export type SegmentedControlOptionProps = Omit<
  ComponentPropsWithRef<'button'>,
  'value' | 'children'
> & {
  /**
   * The value that identifies this option within the SegmentedControl.
   */
  value: string;
  /** The text label displayed inside the option. */
  label: string;
  /**
   * An icon to display before the label. Use the Small icon variant for `size="sm"` and
   * the Medium icon variant for `size="md"`. When using the responsive `size` prop, see
   * the docs for guidance on rendering responsive icons.
   */
  icon?: ReactNode;
};
