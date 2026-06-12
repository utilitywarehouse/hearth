import { forwardRef } from 'react';
import { IconProps } from './types';
export const EditSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3.702 16.3h1.213l8.319-8.308-1.213-1.211-8.319 8.308zM2 18v-3.612L14.447 2 18 5.633 5.617 18zM12.617 7.397l-.596-.616 1.213 1.211z"
        />
      </svg>
    );
  }
);
EditSmallIcon.displayName = 'EditSmallIcon';
