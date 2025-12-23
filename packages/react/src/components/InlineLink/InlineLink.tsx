import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { InlineLinkProps } from './InlineLink.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const COMPONENT_NAME = 'InlineLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const InlineLink = (props: InlineLinkProps) => {
  const {
    className,
    color = 'default',
    children,
    ...inlineLinkProps
  } = extractProps(props, marginPropDefs, textTransformPropDefs);
  return (
    <a
      className={cn(componentClassName, className)}
      data-inverted={color === 'inverted' ? '' : undefined}
      data-inherit-color={color === 'inherit' ? '' : undefined}
      {...inlineLinkProps}
    >
      {children}
    </a>
  );
};

InlineLink.displayName = COMPONENT_NAME;
