import { forwardRef } from 'react';
import { IconProps } from './types';
export const YoutubeMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10.2 15V9.6l5.4 2.709zm10.62-6.282s-.176-1.235-.715-1.778c-.684-.714-1.452-.717-1.804-.758C15.78 6 12.004 6 12.004 6h-.008S8.217 6 5.7 6.182c-.352.041-1.119.045-1.804.758-.54.543-.715 1.778-.715 1.778S3 10.167 3 11.616v1.359c0 1.45.18 2.9.18 2.9s.176 1.235.715 1.778c.685.714 1.584.691 1.985.765 1.44.14 6.12.182 6.12.182s3.783-.005 6.3-.187c.352-.042 1.12-.045 1.805-.759.54-.544.715-1.778.715-1.778s.18-1.45.18-2.9v-1.358c0-1.45-.18-2.9-.18-2.9" /></svg>;
});
YoutubeMediumIcon.displayName = "YoutubeMediumIcon";