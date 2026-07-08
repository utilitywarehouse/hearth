import { forwardRef } from 'react';
import { IconProps } from './types';
export const GoalMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8.1 21.213a10.1 10.1 0 0 1-3.175-2.138q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 2 12q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.137A9.7 9.7 0 0 1 12 2q2.075 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 22 12a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137A9.7 9.7 0 0 1 12 22a9.7 9.7 0 0 1-3.9-.788m9.575-3.538Q20 15.35 20 12t-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20t5.675-2.325M7.75 16.25Q6 14.5 6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18t-4.25-1.75m7.075-1.425Q16 13.65 16 12t-1.175-2.825T12 8 9.175 9.175 8 12t1.175 2.825T12 16t2.825-1.175m-4.237-1.412A1.93 1.93 0 0 1 10 12q0-.825.588-1.412A1.93 1.93 0 0 1 12 10q.825 0 1.412.588Q14 11.175 14 12t-.588 1.412A1.93 1.93 0 0 1 12 14q-.825 0-1.412-.588"
        />
        <path
          fill={color}
          d="M19.605 1.859 21.307.157a.2.2 0 0 1 .224-.054.2.2 0 0 1 .147.178l.248 1.732 1.732.248q.136.02.178.147.042.128-.054.224L22.08 4.334a.44.44 0 0 1-.37.123l-1.625-.232a.42.42 0 0 1-.248-.123.42.42 0 0 1-.123-.248l-.232-1.624a.43.43 0 0 1 .124-.371"
        />
        <path fill={color} d="m12.07 11.237 8.454-8.657.815.797-8.453 8.656z" />
      </svg>
    );
  }
);
GoalMediumIcon.displayName = 'GoalMediumIcon';
