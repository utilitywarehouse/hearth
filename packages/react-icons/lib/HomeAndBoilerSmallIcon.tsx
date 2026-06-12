import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeAndBoilerSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10 10.043q.689.569 1.027 1.06c.23.322.341.626.341.902q0 .583-.39.973-.39.392-.979.39-.586.001-.976-.39a1.33 1.33 0 0 1-.392-.973c0-.276.113-.58.342-.903q.338-.49 1.026-1.059"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M18 3.35v5.795q0 3.61-2.262 6.567Q13.474 18.669 10 19.5q-3.476-.831-5.738-3.788T2 9.145V3.35L10 .5zm-8 1.468c-1.31 1.083-2.293 2.09-2.938 3.02q-.974 1.397-.973 2.585-.002 1.66 1.12 2.78c.742.745 1.676 1.115 2.79 1.115s2.05-.37 2.793-1.116q1.121-1.119 1.12-2.78 0-1.187-.974-2.583C12.293 6.908 11.31 5.9 10 4.819"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);
HomeAndBoilerSmallIcon.displayName = 'HomeAndBoilerSmallIcon';
