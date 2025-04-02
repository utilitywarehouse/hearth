import { forwardRef } from 'react';
import { IconProps } from './types';
export const InsuranceMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.99 3 1.01 11.42 2.19 13l2.8-2.15V20h14v-9.15l2.8 2.15 1.2-1.6zm3.7 9.97c-.1.28-.28.59-.53.93-.25.33-.58.71-1 1.14-.42.42-.96.92-1.6 1.5l-.56.5-.56-.5a47 47 0 0 1-1.6-1.5c-.42-.43-.76-.81-1.01-1.14-.24-.34-.42-.65-.52-.93s-.15-.57-.15-.86c0-.6.2-1.1.61-1.51q.6-.6 1.5-.6c.34 0 .65.07.95.21.16.07.3.16.44.27.12.1.24.21.34.33.1-.12.21-.23.33-.32.14-.11.29-.2.45-.28.3-.14.61-.21.95-.21q.9 0 1.5.6c.4.41.61.91.61 1.51 0 .29-.05.58-.15.86"
        />
      </svg>
    );
  }
);
InsuranceMediumIcon.displayName = 'InsuranceMediumIcon';
