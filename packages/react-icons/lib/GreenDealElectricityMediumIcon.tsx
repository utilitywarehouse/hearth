import { forwardRef } from 'react';
import { IconProps } from './types';
export const GreenDealElectricityMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m5 21 1-7H1l9-13h2l-1 8h6L7 21z" /><path fill={color} d="M18.61 14q-1.839 0-3.115 1.275-1.275 1.276-1.275 3.114a4.37 4.37 0 0 0 .919 2.702L14 22.229l.771.771.71-.71.44-.431q.563.438 1.241.679.68.24 1.448.24 1.838 0 3.114-1.276Q23 20.227 23 18.39V14zm1.097 3.847q0 .225-.164.391l-2.154 2.153a.57.57 0 0 1-.398.172.46.46 0 0 1-.384-.172.56.56 0 0 1-.151-.39q0-.227.15-.378l2.168-2.167q.152-.15.384-.15a.52.52 0 0 1 .385.15q.165.165.164.391" /></svg>;
});
GreenDealElectricityMediumIcon.displayName = "GreenDealElectricityMediumIcon";