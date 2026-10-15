import { Easing } from 'react-native-reanimated';

/** Line height of the axis labels (Body Text SM). */
export const AXIS_LABEL_HEIGHT = 20;
/** Space between the baseline and the x-axis labels. */
export const X_LABEL_GAP = 8;
/** Space above the plot so the top y-axis label can centre on the top gridline. */
export const PLOT_TOP_INSET = AXIS_LABEL_HEIGHT / 2;
/** Minimum space between neighbouring bars. */
export const MIN_BAR_GAP = 8;
export const BAR_RADIUS = 6;
export const BAR_STROKE_WIDTH = 2;
export const GRIDLINE_DASH = '4 4';
export const CARET_WIDTH = 16;
export const CARET_HEIGHT = 8;
export const TOOLTIP_GAP = 8;
export const ANIMATION_DURATION = 250;
/** Shared timing for every bar, selection and caret animation. */
export const ANIMATION_TIMING = {
  duration: ANIMATION_DURATION,
  easing: Easing.out(Easing.ease),
};
export const FILL_FADE_DURATION = 120;
/** Faster timing for the bar fill colour change when a bar is selected or deselected. */
export const FILL_FADE_TIMING = {
  duration: FILL_FADE_DURATION,
  easing: Easing.out(Easing.ease),
};
