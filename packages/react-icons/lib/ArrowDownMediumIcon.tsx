import { forwardRef } from 'react';
import { IconProps } from './types';
export const ArrowDownMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10.683 2v14.981l-6.84-6.84L2 12.005 11.995 22 22 12.006l-1.854-1.865-6.84 6.84V2z"
        />
      </svg>
    );
  }
);
ArrowDownMediumIcon.displayName = 'ArrowDownMediumIcon';
