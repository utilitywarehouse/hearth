import type { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  /** Sets the color of the icon fill */
  color?: string;
  /**
   * Adds an accessible name element to the SVG.
   * You should also include a `titleId`.
   */
  title?: string;
  /**
   * An id which will be referenced by the `aria-labelledby` attribute on the
   * SVG element. Include this if you are adding a title to the icon, the
   * component will handle referencing it.
   */
  titleId?: string;
}
