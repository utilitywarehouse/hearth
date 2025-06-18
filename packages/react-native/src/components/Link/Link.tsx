import type { LinkProps } from './Link.props';
import { createLink } from '@gluestack-ui/link';
import LinkRoot from './LinkRoot';
import LinkTextComponent from './LinkText';
import LinkIcon from './LinkIcon';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const LinkComponent = createLink({
  Root: LinkRoot,
  Text: LinkTextComponent,
});

export const LinkText = LinkComponent.Text;

LinkText.displayName = 'LinkText';

const Link = ({
  children,
  icon = ChevronRightSmallIcon,
  disabled = false,
  target = '_self',
  iconPosition = 'right',
  showIcon = true,
  ...props
}: LinkProps) => {
  const LinkAny = LinkComponent as any;
  return (
    <LinkAny {...props} isDisabled={disabled} isExternal={target === '_blank'}>
      {showIcon && icon && iconPosition === 'left' ? <LinkIcon as={icon} /> : null}
      <LinkText>{children}</LinkText>
      {showIcon && icon && iconPosition === 'right' ? <LinkIcon as={icon} /> : null}
    </LinkAny>
  );
};

Link.displayName = 'Link';

export default Link;
