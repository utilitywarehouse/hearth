import type { InlineLinkProps } from './InlineLink.props';
import InlineLinkRoot from './InlineLinkRoot';

/** Use InlineLink to embed a hyperlink within a sentence or paragraph of body text, inheriting the surrounding typography style. */
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
