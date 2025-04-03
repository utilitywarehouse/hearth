import { forwardRef } from 'react';
import { IconProps } from './types';
export const ClockMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12.16 21.139a8.8 8.8 0 0 1-3.51-.7 9 9 0 0 1-2.86-1.923 9 9 0 0 1-1.923-2.86 8.8 8.8 0 0 1-.7-3.508q0-1.887.7-3.525a9 9 0 0 1 1.92-2.855 9.1 9.1 0 0 1 2.858-1.922 8.8 8.8 0 0 1 3.512-.707q1.887 0 3.527.705a9.1 9.1 0 0 1 2.856 1.92 9 9 0 0 1 1.92 2.854q.707 1.64.707 3.528 0 .568-.067 1.113a9 9 0 0 1-.2 1.072 2.65 2.65 0 0 0-.95-.646 2.8 2.8 0 0 0-1.13-.201q.07-.33.102-.661.03-.332.031-.677 0-2.844-1.975-4.819t-4.825-1.975q-2.837 0-4.812 1.975t-1.975 4.826q0 2.836 1.971 4.811t4.817 1.976q1.113 0 2.103-.33a7 7 0 0 0 1.825-.917q.245.54.665.935t.967.599a9 9 0 0 1-2.566 1.408 8.8 8.8 0 0 1-2.988.504m6.62-3.383q-.54 0-.93-.39a1.28 1.28 0 0 1-.389-.934q0-.54.39-.924.39-.385.934-.385.54 0 .925.386.385.387.385.928 0 .542-.387.93-.387.39-.928.389m-3.896-1.492-3.642-3.734V7.853h1.92v3.873l3.144 3.158z"
        />
      </svg>
    );
  }
);
ClockMediumIcon.displayName = 'ClockMediumIcon';
