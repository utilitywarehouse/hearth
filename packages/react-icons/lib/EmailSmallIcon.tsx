import { forwardRef } from 'react';
import { IconProps } from './types';
export const EmailSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M1.6 16.72V3.28h16.8v13.44zm8.4-5.88 6.72-4.2V4.96L10 9.16l-6.72-4.2v1.68z"
        />
      </svg>
    );
  }
);
EmailSmallIcon.displayName = 'EmailSmallIcon';
