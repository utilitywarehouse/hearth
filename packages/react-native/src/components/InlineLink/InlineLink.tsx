import type { InlineLinkProps } from './InlineLink.props';
import InlineLinkRoot from './InlineLinkRoot';

const InlineLink = ({
  children,
  disabled = false,
  target = '_self',
  rel,
  ...props
}: InlineLinkProps) => {
  return (
    <InlineLinkRoot
      {...props}
      disabled={disabled}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
    >
      {children}
    </InlineLinkRoot>
  );
};
InlineLink.displayName = 'InlineLink';

export default InlineLink;
