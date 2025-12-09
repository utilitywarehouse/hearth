import { forwardRef } from 'react';
import { IconProps } from './types';
export const AttachMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M18.25 15.75q0 2.6-1.825 4.425Q14.599 22 12 22q-2.6 0-4.425-1.825T5.75 15.75V6.5q0-1.875 1.313-3.187Q8.375 2 10.25 2t3.188 1.313T14.75 6.5v8.75q0 1.15-.8 1.95T12 18a2.65 2.65 0 0 1-1.95-.8 2.65 2.65 0 0 1-.8-1.95V6h2v9.25A.73.73 0 0 0 12 16a.73.73 0 0 0 .75-.75V6.5q-.025-1.05-.738-1.775Q11.3 4 10.25 4t-1.775.725T7.75 6.5v9.25q-.025 1.775 1.225 3.012T12 20q1.75 0 2.975-1.238t1.275-3.012V6h2z"
        />
      </svg>
    );
  }
);
AttachMediumIcon.displayName = 'AttachMediumIcon';
