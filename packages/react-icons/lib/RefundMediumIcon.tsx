import { forwardRef } from 'react';
import { IconProps } from './types';
export const RefundMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M11.986 14.07q-.856 0-1.469-.604a1.97 1.97 0 0 1-.611-1.452q0-.849.606-1.459t1.458-.61q.86 0 1.477.596.615.596.616 1.463 0 .87-.61 1.468a2.02 2.02 0 0 1-1.467.598M11.969 21q-3.644 0-6.263-2.517T3 12.3h2.423q.135 2.64 2.02 4.456t4.53 1.817q2.761 0 4.67-1.91 1.91-1.91 1.91-4.654 0-2.742-1.91-4.656t-4.67-1.913q-1.364 0-2.606.553A6.7 6.7 0 0 0 7.181 7.55H9.1v1.878H3.487V3.873h1.85v2.078a9.2 9.2 0 0 1 3.018-2.178A8.7 8.7 0 0 1 11.966 3a8.8 8.8 0 0 1 3.527.71 9.1 9.1 0 0 1 2.867 1.935 9.1 9.1 0 0 1 1.931 2.86q.71 1.636.709 3.506a8.7 8.7 0 0 1-.712 3.502 9.3 9.3 0 0 1-1.932 2.856 9 9 0 0 1-2.866 1.928 8.9 8.9 0 0 1-3.521.703" /></svg>;
});
RefundMediumIcon.displayName = "RefundMediumIcon";