import { forwardRef } from 'react';
import { IconProps } from './types';
export const PlaceholderSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5.563 15.5h8.875l-1.834-1.833q-.543.398-1.208.615a4.5 4.5 0 0 1-1.395.218q-.73 0-1.396-.222a4.5 4.5 0 0 1-1.21-.611zm-.922-1.183 1.692-1.692a4.3 4.3 0 0 1-.615-1.218A4.5 4.5 0 0 1 5.5 10q0-.73.222-1.396t.611-1.208L4.641 5.704zm2.776-2.775L8.937 10l-1.52-1.52q-.209.342-.313.723A3 3 0 0 0 7 10q0 .417.104.805a3 3 0 0 0 .313.737M10 13q.417 0 .797-.104.38-.105.724-.313L10 11.063l-1.52 1.52q.333.209.713.313Q9.574 13 10 13m0-4.062 1.52-1.521a2.8 2.8 0 0 0-.723-.313A3 3 0 0 0 10 7a3 3 0 0 0-.797.104 2.8 2.8 0 0 0-.724.313zm2.583 2.583q.209-.343.313-.724T13 10a3 3 0 0 0-.104-.8 2.7 2.7 0 0 0-.313-.72L11.063 10zm2.776 2.775V5.704l-1.692 1.692q.389.543.61 1.208.223.665.223 1.395t-.218 1.396a4.3 4.3 0 0 1-.615 1.21zm-2.755-7.963L14.438 4.5H5.563l1.833 1.833q.543-.397 1.208-.615A4.5 4.5 0 0 1 9.999 5.5q.73 0 1.396.222t1.21.611M2.6 17.4V2.6h14.8v14.8z"
        />
      </svg>
    );
  }
);
PlaceholderSmallIcon.displayName = 'PlaceholderSmallIcon';
