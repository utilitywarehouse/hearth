import { forwardRef } from 'react';
import { IconProps } from './types';
export const CopyMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M7.5 18V2h13v16zm-4 4V6h2v14h11v2z" />
      </svg>
    );
  }
);
CopyMediumIcon.displayName = 'CopyMediumIcon';
