import type { ComponentPropsWithRef } from 'react';

export interface TimelineItemProps extends ComponentPropsWithRef<'li'> {
  /**
   * The label text to display for this item.
   */
  label: string;
  /**
   * Optional supporting text to display below the label.
   */
  helperText?: string;
  /**
   * The current state of this item, driving the indicator and connector
   * styling.
   */
  state: 'complete' | 'inactive' | 'incomplete';
}
