import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronRightSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M6.507 18 5 16.58 11.985 10 5 3.42 6.507 2 15 10z" />
      </svg>
    );
  }
);
ChevronRightSmallIcon.displayName = 'ChevronRightSmallIcon';
