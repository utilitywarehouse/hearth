import { forwardRef } from 'react';
import { IconProps } from './types';
export const TickMediumIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden={!title}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} d="M10.11 21 3 13.89l1.778-1.778 5.332 5.333L21.555 6l1.778 1.778z" />
      </svg>
    );
  }
);
TickMediumIcon.displayName = 'TickMediumIcon';
