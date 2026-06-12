import { forwardRef } from 'react';
import { IconProps } from './types';
export const WarningMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          fillRule="evenodd"
          d="M11.127 2.5a1 1 0 0 1 1.731 0l9.992 17.277a1 1 0 0 1-.866 1.5H2.002a1 1 0 0 1-.865-1.5zm.866 13.5q-.638 0-1.07.432a1.45 1.45 0 0 0-.43 1.068q0 .637.43 1.069.432.43 1.07.431.637 0 1.069-.431.43-.432.431-1.069 0-.637-.431-1.068A1.45 1.45 0 0 0 11.993 16m-1.375-1h2.75V8.62h-2.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);
WarningMediumIcon.displayName = 'WarningMediumIcon';
