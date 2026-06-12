import { forwardRef } from 'react';
import { IconProps } from './types';
export const CreditReversalMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M18 4.25q2.6.675 4.3 2.8T24 12t-1.7 4.95-4.3 2.8v-2.1a5.74 5.74 0 0 0 2.887-2.15Q22 13.95 22 12t-1.113-3.5A5.74 5.74 0 0 0 18 6.35zM10 4q3.325 0 5.663 2.338T18 12t-2.338 5.663T10 20q-1.65 0-3.1-.625a8.1 8.1 0 0 1-2.55-1.725l1.4-1.4q.825.826 1.912 1.288A5.9 5.9 0 0 0 10 18q2.5 0 4.25-1.75T16 12t-1.75-4.25T10 6a5.9 5.9 0 0 0-2.338.463A6 6 0 0 0 5.75 7.75l-1.4-1.4A8.1 8.1 0 0 1 6.9 4.625Q8.35 4 10 4M4 8l1.4 1.4L3.8 11H11v2H3.8l1.6 1.6L4 16l-4-4z"
        />
      </svg>
    );
  }
);
CreditReversalMediumIcon.displayName = 'CreditReversalMediumIcon';
