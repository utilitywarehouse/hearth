import { forwardRef } from 'react';
import { IconProps } from './types';
export const UploadMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m12 7.5 5.625 5.625-1.575 1.631-2.925-2.925V21h-2.25v-9.169L7.95 14.756l-1.575-1.631zM21 3v5.625h-2.25V5.25H5.25v3.375H3V3z"
        />
      </svg>
    );
  }
);
UploadMediumIcon.displayName = 'UploadMediumIcon';
