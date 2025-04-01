import { forwardRef } from 'react';
import { IconProps } from './types';
export const EmailMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3 19V5h18v14zm8.74-6.283a.5.5 0 0 0 .52 0l6.58-3.999a.748.748 0 1 0-.776-1.278l-5.804 3.527a.5.5 0 0 1-.52 0L5.936 7.44a.748.748 0 0 0-.777 1.278z"
        />
      </svg>
    );
  }
);
