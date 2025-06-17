import { Link, LinkProps } from '../Link';

const AlertLink = ({ children, ...props }: LinkProps) => {
  return <Link {...props}>{children}</Link>;
};

AlertLink.displayName = 'AlertLink';

export default AlertLink;
