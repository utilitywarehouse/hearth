import { forwardRef } from 'react';
import { IconProps } from './types';
export const UserSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10.375 9.563a2.9 2.9 0 0 1-2.125-.876 2.9 2.9 0 0 1-.875-2.124q0-1.25.875-2.125a2.9 2.9 0 0 1 2.125-.875q1.25 0 2.125.874.875.876.875 2.125T12.5 8.688a2.9 2.9 0 0 1-2.125.876m-6 6v-2q0-.48.26-.907a2.2 2.2 0 0 1 .72-.719 10.2 10.2 0 0 1 2.426-1.02 9.7 9.7 0 0 1 5.188 0q1.281.354 2.427 1.02.458.271.719.709t.26.916v2z"
        />
      </svg>
    );
  }
);
