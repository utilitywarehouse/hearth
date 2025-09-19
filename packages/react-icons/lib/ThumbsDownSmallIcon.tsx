import { forwardRef } from 'react';
import { IconProps } from './types';
export const ThumbsDownSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.571 5v9.75L11.905 20l1.41-1.387-.991-3.863H18v-3.3L15.219 5zM2 5v9.75h3.048V5z"
        />
      </svg>
    );
  }
);
ThumbsDownSmallIcon.displayName = 'ThumbsDownSmallIcon';
