import { forwardRef } from 'react';
import { IconProps } from './types';
export const FitEnergyMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.235 21q-3.06-.285-5.147-2.442T4 13.433q0-1.66.742-3.155A7.4 7.4 0 0 1 6.83 7.723l1.713 1.63a5 5 0 0 0-1.572 1.788 4.9 4.9 0 0 0-.57 2.292q0 2.032 1.377 3.517t3.457 1.732zm1.53 0v-2.318q2.11-.262 3.465-1.743 1.353-1.48 1.353-3.506 0-2.112-1.487-3.64-1.488-1.53-3.69-1.675H12l1.361 1.316-1.292 1.235-4-3.823 4-3.846 1.292 1.236L11.725 5.8h.428q3.28 0 5.564 2.245Q20 10.289 20 13.433q0 2.961-2.088 5.121T12.765 21"
        />
        <path fill={color} d="M11.653 17v-2.25H10L12.347 11v2.25H14z" />
      </svg>
    );
  }
);
