import { forwardRef } from 'react';
import { IconProps } from './types';
export const WarningSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          fillRule="evenodd"
          d="M9.291 2.409a.82.82 0 0 1 1.418 0l8.18 14.145a.82.82 0 0 1-.709 1.229H1.82a.82.82 0 0 1-.709-1.229zm.71 11.053q-.523 0-.876.354a1.2 1.2 0 0 0-.353.874q0 .522.353.875t.875.353.875-.353.354-.875-.354-.874a1.2 1.2 0 0 0-.875-.354m-1.126-.819h2.251V7.42h-2.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);
WarningSmallIcon.displayName = 'WarningSmallIcon';
