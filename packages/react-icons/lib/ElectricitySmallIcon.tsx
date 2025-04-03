import { forwardRef } from 'react';
import { IconProps } from './types';
export const ElectricitySmallIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 20 20"
        aria-hidden={!title}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} d="M8.787 19v-6.75H3L11.213 1v6.75H17z" />
      </svg>
    );
  }
);
ElectricitySmallIcon.displayName = 'ElectricitySmallIcon';
