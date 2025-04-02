import { forwardRef } from 'react';
import { IconProps } from './types';
export const UploadSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m10 6 5 5-1.4 1.45-2.6-2.6V18H9V9.85l-2.6 2.6L5 11zm8-4v5h-2V4H4v3H2V2z" /></svg>;
});
UploadSmallIcon.displayName = "UploadSmallIcon";