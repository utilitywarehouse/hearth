import { forwardRef } from 'react';
import { IconProps } from './types';
export const SimSmallIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 20 20"
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
          d="M8.25 1 3 6.4V19h14V1zM6.5 16.3a.89.89 0 0 1-.875-.9c0-.495.394-.9.875-.9a.89.89 0 0 1 .875.9.89.89 0 0 1-.875.9m.875-3.6h-1.75V9.1h1.75zm3.5 3.6h-1.75v-3.6h1.75zM10 10.9a.89.89 0 0 1-.875-.9c0-.495.394-.9.875-.9a.89.89 0 0 1 .875.9.89.89 0 0 1-.875.9m3.5 5.4a.89.89 0 0 1-.875-.9c0-.495.394-.9.875-.9a.89.89 0 0 1 .875.9.89.89 0 0 1-.875.9m.875-3.6h-1.75V9.1h1.75z"
        />
      </svg>
    );
  }
);
SimSmallIcon.displayName = 'SimSmallIcon';
