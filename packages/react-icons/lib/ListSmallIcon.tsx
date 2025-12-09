import { forwardRef } from 'react';
import { IconProps } from './types';
export const ListSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M2 5a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 5" />
        <path fill={color} d="M7 3.75h11v2.5H7z" />
        <path fill={color} d="M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10" />
        <path fill={color} d="M7 8.75h11v2.5H7z" />
        <path fill={color} d="M2 15a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 15" />
        <path fill={color} d="M7 13.75h11v2.5H7z" />
      </svg>
    );
  }
);
ListSmallIcon.displayName = 'ListSmallIcon';
