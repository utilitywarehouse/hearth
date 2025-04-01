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
          d="M5.606 16 4 14.394 8.394 10 4 5.606 5.606 4 10 8.394 14.394 4 16 5.606 11.606 10 16 14.394 14.394 16 10 11.606z"
        />
      </svg>
    );
  }
);
