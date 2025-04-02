import { forwardRef } from 'react';
import { IconProps } from './types';
export const OpenMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3 21V3h7.668v2.441H5.426v13.133h13.133v-5.242H21V21zm7.362-5.67-1.676-1.692 8.196-8.197h-3.67V3H21v7.787h-2.441V7.133z"
        />
      </svg>
    );
  }
);
OpenMediumIcon.displayName = 'OpenMediumIcon';
