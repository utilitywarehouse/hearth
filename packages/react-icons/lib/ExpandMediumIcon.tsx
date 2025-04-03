import { forwardRef } from 'react';
import { IconProps } from './types';
export const ExpandMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.5 22 5 15.464l1.758-1.768 4.742 4.77 4.743-4.77L18 15.464zM6.758 10.304 5 8.536 11.5 2 18 8.536l-1.758 1.768-4.742-4.77z"
        />
      </svg>
    );
  }
);
ExpandMediumIcon.displayName = 'ExpandMediumIcon';
