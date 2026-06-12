import { forwardRef } from 'react';
import { IconProps } from './types';
export const CelebrationMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m1.944 22 5-14 9 9zm12.55-9.45-1.05-1.05 7.525-7.525L23.494 6.5l-1.05 1.05-1.475-1.475zm-4-4L9.444 7.5l1.45-1.45-1.5-1.5 1.05-1.05 2.55 2.55zm2 2-1.05-1.05 4.475-4.475-2.475-2.475 1.05-1.05 3.525 3.525zm4 4-1.05-1.05 3.525-3.525 3.525 3.525-1.05 1.05-2.475-2.475z"
        />
      </svg>
    );
  }
);
CelebrationMediumIcon.displayName = 'CelebrationMediumIcon';
