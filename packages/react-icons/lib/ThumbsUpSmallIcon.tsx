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
          d="M6.625 15V5.25L11.875 0l1.387 1.388-.975 3.862h5.588v3.3L15.137 15zm-4.5 0V5.25h3V15z"
        />
      </svg>
    );
  }
);
ThumbsUpSmallIcon.displayName = 'ThumbsUpSmallIcon';
