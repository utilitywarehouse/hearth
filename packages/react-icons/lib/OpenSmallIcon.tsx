import { forwardRef } from 'react';
import { IconProps } from './types';
export const OpenSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M2 18V2h8v1.778H3.778v12.444h12.444V10H18v8zm5.956-4.711L6.71 12.044l8.267-8.266h-3.2V2H18v6.222h-1.778v-3.2z"
        />
      </svg>
    );
  }
);
OpenSmallIcon.displayName = 'OpenSmallIcon';
