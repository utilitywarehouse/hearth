import { forwardRef } from 'react';
import { IconProps } from './types';
export const BookmarkMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M5 21V3h14v18l-7-3z" />
      </svg>
    );
  }
);
BookmarkMediumIcon.displayName = 'BookmarkMediumIcon';
