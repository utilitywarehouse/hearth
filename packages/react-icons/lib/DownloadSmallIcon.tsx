import { forwardRef } from 'react';
import { IconProps } from './types';
export const DownloadSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10 14 5 9l1.4-1.45 2.6 2.6V2h2v8.15l2.6-2.6L15 9zm-8 4v-5h2v3h12v-3h2v5z"
        />
      </svg>
    );
  }
);
