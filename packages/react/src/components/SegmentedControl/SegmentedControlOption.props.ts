import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

// Based on ComponentPropsWithRef<'button'> for the underlying HTML surface, and Pick specific
// behavioural props from Toggle.Props rather than extending it wholesale. Toggle.Props also adds
// render (slot customisation), className/style as state callbacks, and preventBaseUIHandler on
// every event handler — none of which Hearth exposes on any other component.
export type SegmentedControlOptionProps = Omit<
  ComponentPropsWithRef<'button'>,
  'value' | 'children'
> &
  Pick<TogglePrimitive.Props, 'pressed' | 'defaultPressed' | 'onPressedChange'> & {
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
