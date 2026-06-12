import { forwardRef } from 'react';
import { IconProps } from './types';
export const HeartMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m11.977 21-1.531-1.327q-2.51-2.205-4.138-3.808-1.627-1.605-2.587-2.88-.96-1.273-1.34-2.338A6.4 6.4 0 0 1 2 8.465q0-2.331 1.612-3.898T7.625 3q1.268 0 2.37.495 1.104.495 1.982 1.462.97-1.013 2.043-1.485A5.7 5.7 0 0 1 16.328 3q2.416 0 4.044 1.567T22 8.465q0 1.11-.377 2.167t-1.34 2.328-2.603 2.886-4.157 3.827z"
        />
      </svg>
    );
  }
);
HeartMediumIcon.displayName = 'HeartMediumIcon';
