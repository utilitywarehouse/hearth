import { forwardRef } from 'react';
import { IconProps } from './types';
export const AiGeneratedMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.284 8.223a2.02 2.02 0 0 0 1.142-1.156l1.4-3.664c.327-.854 1.53-.869 1.878-.023l1.533 3.723a2.02 2.02 0 0 0 1.123 1.109l3.708 1.472c.85.338.85 1.54 0 1.878l-3.694 1.466a2.02 2.02 0 0 0-1.132 1.133l-1.467 3.694c-.338.85-1.54.85-1.878 0L7.431 14.16a2.02 2.02 0 0 0-1.133-1.133l-3.693-1.466c-.85-.338-.85-1.54 0-1.878z"
        />
        <path
          fill={color}
          d="M15.466 18.095c.302-.12.54-.36.656-.664l.806-2.107a.58.58 0 0 1 1.08-.014l.88 2.142c.12.29.354.52.646.637l2.132.847a.58.58 0 0 1 0 1.08l-2.124.843a1.16 1.16 0 0 0-.65.65l-.844 2.125a.58.58 0 0 1-1.08 0l-.843-2.125a1.16 1.16 0 0 0-.65-.65l-2.125-.844a.58.58 0 0 1 0-1.08z"
        />
        <path
          fill={color}
          d="M17.179 2.324a.86.86 0 0 0 .485-.491L18.26.276a.43.43 0 0 1 .798-.01l.652 1.582c.089.216.26.386.477.471l1.576.626a.43.43 0 0 1 0 .798l-1.57.624a.86.86 0 0 0-.481.48l-.623 1.57a.43.43 0 0 1-.799 0l-.623-1.57a.86.86 0 0 0-.48-.48l-1.57-.624a.43.43 0 0 1 0-.798z"
        />
      </svg>
    );
  }
);
AiGeneratedMediumIcon.displayName = 'AiGeneratedMediumIcon';
