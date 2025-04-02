import { forwardRef } from 'react';
import { IconProps } from './types';
export const FilterMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10.686 21v-5.966h2.193v1.913H21v2.155h-8.121V21zM3 19.102v-2.155h6.42v2.155zm4.227-4.138v-1.898H3v-2.132h4.227V9.005h2.192v5.959zm3.46-1.898v-2.132H21v2.132zm3.894-4.1V3h2.192v1.898H21v2.155h-4.227v1.913zM3 7.053V4.898h10.314v2.155z"
        />
      </svg>
    );
  }
);
FilterMediumIcon.displayName = 'FilterMediumIcon';
