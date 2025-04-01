import { forwardRef } from 'react';
import { IconProps } from './types';
export const TrashSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8.375 12.938a.75.75 0 0 0 1.5 0v-5.5a.75.75 0 0 0-1.5 0zm2.5 0a.75.75 0 0 0 1.5 0v-5.5a.75.75 0 0 0-1.5 0zm-5.5 3.75v-11.5h-1v-1.5h4v-1h4v1h4v1.5h-1v11.5z"
        />
      </svg>
    );
  }
);
