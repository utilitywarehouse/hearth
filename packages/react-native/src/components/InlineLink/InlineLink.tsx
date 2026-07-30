import type { InlineLinkProps } from './InlineLink.props';
import { createLink } from '@gluestack-ui/link';
import InlineLinkRoot from './InlineLinkRoot';

const InlineLinkComponent = createLink({
  Root: InlineLinkRoot,
  Text: () => null,
});

const InlineLink = ({
  children,
  disabled = false,
  target = '_self',
  rel,
  ...props
}: InlineLinkProps) => {
  const InlineLinkAny = InlineLinkComponent as any;
  // `@gluestack-ui/link`'s `useLink` only ever applies `target`/`rel` via a ref
  // mutation during render, before the ref is attached at commit - it never
  // takes effect. Pass them through explicitly instead; InlineLinkRoot forwards
  // them to the underlying Text as `hrefAttrs`, which is how react-native-web
  // actually applies them to the rendered `<a>`.
  return (
    <InlineLinkAny
      {...props}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
      isDisabled={disabled}
      isExternal={target === '_blank'}
    >
      {children as any}
    </InlineLinkAny>
  );
};
InlineLink.displayName = 'InlineLink';

export default InlineLink;
