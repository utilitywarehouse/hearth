import { createLink } from '@gluestack-ui/core/link/creator';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import type { LinkProps } from './Link.props';
import LinkIcon from './LinkIcon';
import LinkRoot from './LinkRoot';
import LinkTextComponent from './LinkText';

const LinkComponent = createLink({
  Root: LinkRoot,
  Text: LinkTextComponent,
});

type LinkTextProps = ComponentPropsWithoutRef<typeof LinkTextComponent>;
type LinkTextRef = ComponentRef<typeof LinkTextComponent>;
type LinkTextComponentType = ForwardRefExoticComponent<LinkTextProps & RefAttributes<LinkTextRef>>;
export const LinkText: LinkTextComponentType = forwardRef((props: LinkTextProps, ref) => (
  <LinkComponent.Text {...props} ref={ref} />
));

LinkText.displayName = 'LinkText';

const Link = ({
  children,
  icon = ChevronRightSmallIcon,
  disabled = false,
  target = '_self',
  iconPosition = 'right',
  showIcon = true,
  textStyle,
  iconStyle,
  ...props
}: LinkProps) => {
  const LinkAny = LinkComponent as any;
  return (
    <LinkAny {...props} isDisabled={disabled} isExternal={target === '_blank'}>
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
