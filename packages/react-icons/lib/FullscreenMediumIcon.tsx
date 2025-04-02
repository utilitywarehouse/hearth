import { forwardRef } from 'react';
import { IconProps } from './types';
export const FullscreenMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3 21v-7.988h2.426v3.84l11.41-11.41h-3.84V3H21v8.004h-2.441v-3.84l-11.41 11.41h3.839V21z"
        />
      </svg>
    );
  }
);
FullscreenMediumIcon.displayName = 'FullscreenMediumIcon';
