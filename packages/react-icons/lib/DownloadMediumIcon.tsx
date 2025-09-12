import { forwardRef } from 'react';
import { IconProps } from './types';
export const DownloadMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m12 16.5-5.625-5.625L7.95 9.244l2.925 2.925V3h2.25v9.169l2.925-2.925 1.575 1.631zM3 21v-5.625h2.25v3.375h13.5v-3.375H21V21z"
        />
      </svg>
    );
  }
);
DownloadMediumIcon.displayName = 'DownloadMediumIcon';
