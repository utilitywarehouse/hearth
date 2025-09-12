import { forwardRef } from 'react';
import { IconProps } from './types';
export const IncomeProtectMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M20.54 13.46C19.56 12.49 18.38 12 17 12s-2.56.49-3.54 1.46C12.49 14.44 12 15.62 12 17s.49 2.56 1.46 3.54c.98.97 2.16 1.46 3.54 1.46s2.56-.49 3.54-1.46C21.51 19.56 22 18.38 22 17s-.49-2.56-1.46-3.54m-1.18 5.52c-.07.35-.26.64-.56.86-.31.21-.64.31-.99.31h-2.85v-1.04l.27-.16c.06-.03.13-.09.23-.2.08-.08.17-.2.25-.34.06-.14.1-.29.1-.45 0-.03 0-.05-.01-.08h-.84v-1.15h.3c-.04-.06-.07-.12-.11-.19-.13-.25-.19-.54-.19-.85 0-.56.2-1.04.59-1.44.4-.4.88-.6 1.45-.6.43 0 .82.12 1.16.36s.58.55.73.94l.09.23-1.07.44-.09-.24c-.05-.17-.16-.3-.32-.42a.8.8 0 0 0-.5-.16c-.25 0-.45.08-.64.26-.17.17-.25.38-.25.63 0 .2.05.36.15.49.12.16.23.34.34.55h1.46v1.15h-1.1v.08c0 .31-.06.58-.17.83-.03.07-.07.14-.1.21h1.12c.1 0 .24-.02.31-.09.08-.08.14-.18.18-.33l.08-.29 1.01.5z"
        />
        <path
          fill={color}
          d="M12 2 4 5v6.1c0 2.53.75 4.84 2.26 6.91C7.77 20.09 9.68 21.42 12 22c.02 0 .03 0 .04-.01s.02-.02.04-.02c-.6-.61-1.1-1.34-1.49-2.17S10 18.03 10 17c0-1.93.68-3.58 2.05-4.95S15.07 10 17 10c.48 0 1 .06 1.54.17.54.12 1.03.29 1.46.5V5z"
        />
      </svg>
    );
  }
);
IncomeProtectMediumIcon.displayName = 'IncomeProtectMediumIcon';
