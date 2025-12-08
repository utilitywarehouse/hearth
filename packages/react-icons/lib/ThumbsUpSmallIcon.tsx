import { forwardRef } from 'react';
import { IconProps } from './types';
export const ThumbsUpSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.571 15V5.25L11.905 0l1.41 1.388-.991 3.862H18v3.3L15.219 15zM2 15V5.25h3.048V15z"
        />
      </svg>
    );
  }
);
ThumbsUpSmallIcon.displayName = 'ThumbsUpSmallIcon';
