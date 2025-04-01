import { forwardRef } from 'react';
import { IconProps } from './types';
export const FilterSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.377 17.33v-5.365h1.865v1.75h6v1.865h-6v1.75zM2.7 15.58v-1.865h5.365v1.865zm3-2.938v-1.75h-3V9.038h3v-1.75h1.865v5.354zm3.177-1.75V9.038h8.365v1.854zm3-2.927V2.6h1.865v1.75h3.5v1.865h-3.5v1.75zM2.7 6.215V4.35h8.365v1.865z"
        />
      </svg>
    );
  }
);
