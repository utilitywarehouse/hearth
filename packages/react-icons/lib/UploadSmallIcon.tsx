import { forwardRef } from 'react';
import { IconProps } from './types';
export const UploadSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m10 6.25 4.688 4.688-1.313 1.359-2.437-2.438V17.5H9.062V9.86l-2.437 2.437-1.312-1.36zm7.5-3.75v4.688h-1.875V4.374H4.375v2.813H2.5V2.5z"
        />
      </svg>
    );
  }
);
UploadSmallIcon.displayName = 'UploadSmallIcon';
