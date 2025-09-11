import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronDownSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M2 6.507 3.42 5 10 11.985 16.58 5 18 6.507 10 15z" />
      </svg>
    );
  }
);
ChevronDownSmallIcon.displayName = 'ChevronDownSmallIcon';
