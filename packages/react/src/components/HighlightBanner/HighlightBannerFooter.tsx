import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'HighlightBannerFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const HighlightBannerFooter = ({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  return <div className={cn(componentClassName, className)} {...props} />;
};

HighlightBannerFooter.displayName = COMPONENT_NAME;
