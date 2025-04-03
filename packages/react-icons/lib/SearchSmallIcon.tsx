import { forwardRef } from 'react';
import { IconProps } from './types';
export const SearchSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m15.879 17.318-5.062-5.061q-.613.411-1.353.648a5.2 5.2 0 0 1-1.593.237q-2.19 0-3.73-1.541T2.6 7.87t1.54-3.73Q5.683 2.6 7.87 2.6q2.19 0 3.73 1.54 1.542 1.542 1.542 3.731 0 .866-.237 1.593a5.2 5.2 0 0 1-.648 1.33l5.073 5.085zM7.871 11.1q1.352 0 2.29-.938.939-.94.939-2.291 0-1.352-.938-2.291-.94-.939-2.291-.938-1.353 0-2.291.938-.938.94-.938 2.29 0 1.353.938 2.292.94.938 2.29.938"
        />
      </svg>
    );
  }
);
SearchSmallIcon.displayName = 'SearchSmallIcon';
