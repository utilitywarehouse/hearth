import { forwardRef } from 'react';
import { IconProps } from './types';
export const MicrophoneOffMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M17.75 14.95 16.3 13.5q.35-.575.525-1.2T17 11h2q0 1.1-.325 2.088a7.3 7.3 0 0 1-.925 1.862m-2.95-3L9 6.15V5q0-1.25.875-2.125A2.9 2.9 0 0 1 12 2q1.25 0 2.125.875T15 5v6q0 .275-.062.5-.063.225-.138.45M11 21v-3.1q-2.6-.35-4.3-2.312Q5 13.625 5 11h2q0 2.075 1.463 3.537Q9.926 16 12 16a4.92 4.92 0 0 0 3-1l1.425 1.425a7.5 7.5 0 0 1-1.588.962A6.5 6.5 0 0 1 13 17.9V21zm8.8 1.6L1.4 4.2l1.4-1.4 18.4 18.4z"
        />
      </svg>
    );
  }
);
MicrophoneOffMediumIcon.displayName = 'MicrophoneOffMediumIcon';
