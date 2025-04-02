import { forwardRef } from 'react';
import { IconProps } from './types';
export const TrashMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9 16a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0zm4 0a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0zm-8 5V6H4V4h5V3h6v1h5v2h-1v15z"
        />
      </svg>
    );
  }
);
TrashMediumIcon.displayName = 'TrashMediumIcon';
