'use client';

import { cn } from '../../helpers/cn';
import type { CardActionLinkProps } from './CardActionLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';

const COMPONENT_NAME = 'CardActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActionLink = ({
  className,
  heading,
  helperText,
  leadingIcon,
  leadingIconContainerColorScheme,
  trailingIcon,
  badge,
  badgePlacement,
  ...props
}: CardActionLinkProps) => {
  const contentProps = {
    heading,
    helperText,
    leadingIcon,
    leadingIconContainerColorScheme,
    badge,
    badgePlacement,
  };
  return (
    <a className={cn(componentClassName, className)} {...props}>
      <CardActionContent
        trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
        {...contentProps}
      />
    </a>
  );
};

CardActionLink.displayName = COMPONENT_NAME;
