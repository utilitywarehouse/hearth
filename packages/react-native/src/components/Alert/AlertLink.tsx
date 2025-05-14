import React, { forwardRef } from 'react';
import { PressableRef } from '../../types';
import { Link, LinkProps } from '../Link';

const AlertLink = forwardRef<PressableRef, LinkProps>(({ children, ...props }, ref) => {
  return (
    <Link ref={ref} {...props}>
      {children}
    </Link>
  );
});

AlertLink.displayName = 'AlertLink';

export default AlertLink;
