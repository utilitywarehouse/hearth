import { createLink } from '@gluestack-ui/link';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import type { LinkProps } from './Link.props';
import LinkIcon from './LinkIcon';
import LinkRoot from './LinkRoot';
import LinkTextComponent from './LinkText';

const LinkComponent = createLink({
  Root: LinkRoot,
  Text: LinkTextComponent,
});

export const LinkText = LinkComponent.Text;

LinkText.displayName = 'LinkText';

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
  const LinkAny = LinkComponent as any;
  // `@gluestack-ui/link`'s `useLink` only ever applies `target`/`rel` via a ref
  // mutation during render, before the ref is attached at commit - it never
  // takes effect. Pass them through explicitly instead; LinkRoot forwards them
  // to the underlying Pressable as `hrefAttrs`, which is how react-native-web
  // actually applies them to the rendered `<a>`.
  return (
    <LinkAny
      {...props}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
      isDisabled={disabled}
      isExternal={target === '_blank'}
    >
      {showIcon && icon && iconPosition === 'left' ? (
        <LinkIcon as={icon} style={iconStyle} />
      ) : null}
      <LinkText style={textStyle}>{children}</LinkText>
      {showIcon && icon && iconPosition === 'right' ? (
        <LinkIcon as={icon} style={iconStyle} />
      ) : null}
    </LinkAny>
  );
};

Link.displayName = 'Link';

export default Link;
