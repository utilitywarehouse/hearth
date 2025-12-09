import { forwardRef } from 'react';
import { IconProps } from './types';
export const CloseSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5.2 16 4 14.8 8.8 10 4 5.2 5.2 4 10 8.8 14.8 4 16 5.2 11.2 10l4.8 4.8-1.2 1.2-4.8-4.8z"
        />
      </svg>
    );
  }
);
CloseSmallIcon.displayName = 'CloseSmallIcon';
