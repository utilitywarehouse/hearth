import { forwardRef } from 'react';
import { IconProps } from './types';
export const QuestionMarkMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.7 18.375q.525 0 .888-.363.362-.362.362-.887t-.362-.887a1.2 1.2 0 0 0-.888-.363q-.525 0-.887.363a1.2 1.2 0 0 0-.363.887q0 .525.363.887.362.363.887.363m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3a7.5 7.5 0 0 0 1.025-1.238q.375-.587.375-1.412 0-1.4-1.025-2.15t-2.425-.75q-1.424 0-2.312.75T8.3 8.925l1.65.65q.124-.45.563-.975.437-.525 1.337-.525.8 0 1.2.438.4.437.4.962 0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825m.95 7.85a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175a9.7 9.7 0 0 1-.788-3.9q0-2.075.788-3.9A10.1 10.1 0 0 1 4.675 5.3q1.35-1.35 3.175-2.137a9.7 9.7 0 0 1 3.9-.788q2.075 0 3.9.788A10.1 10.1 0 0 1 18.825 5.3q1.35 1.35 2.137 3.175a9.7 9.7 0 0 1 .788 3.9 9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137a9.7 9.7 0 0 1-3.9.788"
        />
      </svg>
    );
  }
);
