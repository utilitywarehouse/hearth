import { createLink } from '@gluestack-ui/core/link/creator';
import type { InlineLinkProps } from './InlineLink.props';
import InlineLinkRoot from './InlineLinkRoot';

const InlineLinkComponent = createLink({
  Root: InlineLinkRoot,
  Text: () => null,
});

const InlineLink = ({
  children,
  disabled = false,
  target = '_self',
  ...props
}: InlineLinkProps) => {
  const InlineLinkAny = InlineLinkComponent as any;
  return (
    <InlineLinkAny {...props} isDisabled={disabled} isExternal={target === '_blank'}>
      {children as any}
    </InlineLinkAny>
  );
};
InlineLink.displayName = 'InlineLink';

export default InlineLink;
