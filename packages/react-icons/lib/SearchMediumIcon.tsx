import { forwardRef } from 'react';
import { IconProps } from './types';
export const SearchMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m19.25 21-6.2-6.192a5.3 5.3 0 0 1-1.59.81 6.4 6.4 0 0 1-1.98.296q-2.71 0-4.595-1.889T3 9.457t1.886-4.568Q6.773 2.999 9.456 3t4.563 1.889q1.878 1.89 1.878 4.57 0 1.057-.288 1.95a5.8 5.8 0 0 1-.832 1.638L21 19.255zm-9.78-7.532q1.678 0 2.832-1.168 1.152-1.17 1.152-2.843T12.3 6.614q-1.155-1.168-2.83-1.168-1.686 0-2.856 1.168-1.17 1.169-1.17 2.843T6.61 12.3t2.86 1.168"
        />
      </svg>
    );
  }
);
SearchMediumIcon.displayName = 'SearchMediumIcon';
