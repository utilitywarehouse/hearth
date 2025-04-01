import { forwardRef } from 'react';
import { IconProps } from './types';
export const LaunchMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m2.39 10.31 4.2-4.2q.35-.35.825-.5.474-.15.975-.05l1.3.275q-1.35 1.6-2.125 2.9t-1.5 3.15zm5.125 2.275q.575-1.8 1.562-3.4a16.5 16.5 0 0 1 2.388-3 14.3 14.3 0 0 1 5.025-3.288q2.825-1.088 5.275-.662.424 2.45-.65 5.275a14.2 14.2 0 0 1-3.275 5.025 16.8 16.8 0 0 1-3 2.387 15.2 15.2 0 0 1-3.425 1.588zm6.9-3a1.92 1.92 0 0 0 1.412.575 1.92 1.92 0 0 0 1.413-.575 1.92 1.92 0 0 0 .575-1.413 1.92 1.92 0 0 0-.575-1.412 1.92 1.92 0 0 0-1.413-.575 1.92 1.92 0 0 0-1.412.575 1.92 1.92 0 0 0-.575 1.412q0 .838.575 1.413m-.7 12.025-1.6-3.675q1.85-.726 3.162-1.5 1.313-.775 2.913-2.125l.25 1.3q.1.5-.05.987t-.5.838zM3.99 15.785a2.94 2.94 0 0 1 2.125-.888 2.85 2.85 0 0 1 2.125.863q.875.874.875 2.125T8.24 20.01q-.625.624-2.088 1.075-1.462.45-4.037.8.35-2.576.8-4.025t1.075-2.075"
        />
      </svg>
    );
  }
);
