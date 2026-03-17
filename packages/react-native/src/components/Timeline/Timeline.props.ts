import { ViewProps } from 'react-native';

export type TimelineVariant = 'static' | 'progress';
export type TimelineItemState = 'complete' | 'active' | 'incomplete';
export type TimelineItemPosition = 'single' | 'start' | 'middle' | 'end';

export interface TimelineProps extends ViewProps {
  /**
   * Child TimelineItem components.
   */
  children: React.ReactNode;
  /**
   * Controls the indicator style used by all child timeline items.
   * @default 'static'
   */
  variant?: TimelineVariant;
}

export interface TimelineItemProps extends ViewProps {
  /**
   * The primary label for the timeline item.
   */
  label: string;
  /**
   * Optional supporting text displayed beneath the label.
   */
  helperText?: string;
  /**
   * Visual state for progress timelines.
   * @default 'incomplete'
   */
  state?: TimelineItemState;
  /**
   * Optional custom content rendered beneath the text content.
   */
  children?: React.ReactNode;
  /**
   * The timeline variant used when the item is rendered standalone.
   * Items inside Timeline receive this automatically.
   * @default 'static'
   */
  variant?: TimelineVariant;
  /**
   * The item's position in the timeline used to draw connectors.
   * Items inside Timeline receive this automatically.
   * @default 'single'
   */
  position?: TimelineItemPosition;
}

export default TimelineProps;
