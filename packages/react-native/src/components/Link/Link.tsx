import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import type { LinkProps } from './Link.props';
import LinkIcon from './LinkIcon';
import LinkRoot from './LinkRoot';
import LinkTextComponent from './LinkText';

export const LinkText = LinkTextComponent;

/**
 * Navigates a user to another screen or website, another place on the same page, or opens a link
 * in a new tab.
 * @summary A navigational link with an optional icon.
 */
const Link = ({
  children,
  icon = ChevronRightSmallIcon,
  disabled = false,
  target = '_self',
  rel,
  iconPosition = 'right',
  showIcon = true,
  textStyle,
  iconStyle,
  ...props
}: LinkProps) => {
  return (
    <LinkRoot
      {...props}
      disabled={disabled}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
    >
      {showIcon && icon && iconPosition === 'left' ? (
        <LinkIcon as={icon} style={iconStyle} />
      ) : null}
      <LinkText style={textStyle}>{children}</LinkText>
      {showIcon && icon && iconPosition === 'right' ? (
        <LinkIcon as={icon} style={iconStyle} />
      ) : null}
    </LinkRoot>
  );
};

Link.displayName = 'Link';

export default Link;
