import { forwardRef } from 'react';
import { IconProps } from './types';
export const MobileMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5 23V1h14v22zm7-2.5q.424 0 .713-.288A.97.97 0 0 0 13 19.5a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 18.5a.97.97 0 0 0-.713.288.97.97 0 0 0-.287.712q0 .424.287.712.288.288.713.288M7 16h10V6H7z"
        />
      </svg>
    );
  }
);
MobileMediumIcon.displayName = 'MobileMediumIcon';
