import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeOutlineMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.404 18.596h2.55v-2.833a3.04 3.04 0 1 1 6.077 0v2.833h2.55v-8.391l-5.589-4.188-5.588 4.193zM4 21V9.003L11.992 3 20 9v12h-7.089v-5.237a.919.919 0 1 0-1.837 0V21z"
        />
      </svg>
    );
  }
);
