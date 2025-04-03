import { forwardRef } from 'react';
import { IconProps } from './types';
export const CameraMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12 17.5q1.875 0 3.188-1.312Q16.5 14.875 16.5 13t-1.312-3.187T12 8.5 8.813 9.813Q7.499 11.125 7.5 13q0 1.875 1.313 3.188Q10.125 17.5 12 17.5m0-2q-1.05 0-1.775-.725T9.5 13t.725-1.775T12 10.5t1.775.725T14.5 13t-.725 1.775T12 15.5M2 21V5h5.15L9 3h6l1.85 2H22v16z"
        />
      </svg>
    );
  }
);
CameraMediumIcon.displayName = 'CameraMediumIcon';
