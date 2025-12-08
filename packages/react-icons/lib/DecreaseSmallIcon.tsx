import { forwardRef } from 'react';
import { IconProps } from './types';
export const DecreaseSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M9 14.175V2h2v12.175l5.6-5.6L18 10l-8 8-8-8 1.4-1.425z" />
      </svg>
    );
  }
);
DecreaseSmallIcon.displayName = 'DecreaseSmallIcon';
