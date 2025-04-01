import { forwardRef } from 'react';
import { IconProps } from './types';
export const BasketMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4.35 21.775 1 9.775h6.075L12.3 2l5.225 7.775h6.125l-3.35 12zm7.975-4q.824 0 1.413-.587.587-.588.587-1.413t-.587-1.412a1.93 1.93 0 0 0-1.413-.588q-.825 0-1.412.588a1.93 1.93 0 0 0-.588 1.412q0 .824.588 1.412.587.588 1.412.588m-2.825-8h5.625l-2.825-4.2z"
        />
      </svg>
    );
  }
);
