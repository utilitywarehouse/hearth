import { forwardRef } from 'react';
import { IconProps } from './types';
export const LoginSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.906 17.4v-2.04h5.453V4.641H9.906V2.6h7.495v14.8zm-1.865-3.334L6.59 12.638l1.617-1.617H2.6V8.98h5.607L6.59 7.363l1.451-1.428L12.095 10z"
        />
      </svg>
    );
  }
);
