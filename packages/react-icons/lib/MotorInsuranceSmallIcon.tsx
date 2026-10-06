import { forwardRef } from 'react';
import { IconProps } from './types';
export const MotorInsuranceSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M7.772 9.5a.7.7 0 0 1 .525.219.73.73 0 0 1 .216.531.73.73 0 0 1-.216.531.7.7 0 0 1-.525.219.7.7 0 0 1-.525-.219.73.73 0 0 1-.216-.531q0-.312.216-.531a.7.7 0 0 1 .525-.219"
        />
        <path
          fill={color}
          d="M12.217 9.5a.7.7 0 0 1 .524.219.73.73 0 0 1 .216.531.73.73 0 0 1-.216.531.7.7 0 0 1-.524.219.7.7 0 0 1-.525-.219.73.73 0 0 1-.216-.531q0-.312.216-.531a.7.7 0 0 1 .525-.219"
        />
        <path fill={color} d="m12.538 6.5.519 1.5H6.933l.518-1.5z" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M18 3.35v5.795q0 3.61-2.263 6.567T10 19.5q-3.474-.831-5.736-3.788Q2 12.756 2 9.145V3.35L9.999.5zM7.278 5.5a.7.7 0 0 0-.425.138.7.7 0 0 0-.266.362L5.55 9v4a.49.49 0 0 0 .494.5h.494q.21 0 .352-.144A.5.5 0 0 0 7.03 13v-.5h5.926v.5a.49.49 0 0 0 .494.5h.494q.21 0 .352-.144a.5.5 0 0 0 .141-.356V9L13.4 6a.7.7 0 0 0-.264-.362.7.7 0 0 0-.426-.138z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);
MotorInsuranceSmallIcon.displayName = 'MotorInsuranceSmallIcon';
