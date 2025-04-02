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
        <path
          fill={color}
          d="M7.563 17.89V3.346h12.45v14.542zm-3.55 3.457V6.805h2.175v12.424h10.276v2.118z"
        />
      </svg>
    );
  }
);
CopyMediumIcon.displayName = 'CopyMediumIcon';
