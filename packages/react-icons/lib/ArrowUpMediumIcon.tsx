import { forwardRef } from 'react';
import { IconProps } from './types';
export const ArrowUpMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="M13.317 22V7.019l6.84 6.84L22 11.995 12.006 2 2 11.995l1.854 1.864 6.84-6.84V22z"
        />
      </svg>
    );
  }
);
ArrowUpMediumIcon.displayName = 'ArrowUpMediumIcon';
