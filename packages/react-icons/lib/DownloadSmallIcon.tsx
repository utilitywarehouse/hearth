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
          d="M10 13.75 5.313 9.063l1.312-1.36 2.438 2.438V2.5h1.874v7.64l2.438-2.437 1.313 1.36zM2.5 17.5v-4.687h1.875v2.812h11.25v-2.812H17.5V17.5z"
        />
      </svg>
    );
  }
);
DownloadSmallIcon.displayName = 'DownloadSmallIcon';
