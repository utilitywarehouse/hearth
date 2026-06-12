import { forwardRef } from 'react';
import { IconProps } from './types';
export const SimMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10 2 4 8v14h16V2zM8 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m1-4H7v-4h2zm4 4h-2v-4h2zm-1-6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m4 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m1-4h-2v-4h2z"
        />
      </svg>
    );
  }
);
SimMediumIcon.displayName = 'SimMediumIcon';
