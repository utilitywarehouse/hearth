'use client';

import clsx from 'clsx';
import type { CardActionButtonProps } from './CardActionButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';

const COMPONENT_NAME = 'CardActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActionButton = ({
  className,
  heading,
  helperText,
  leadingIcon,
  leadingIconContainerColorScheme,
  trailingIcon,
  badge,
  badgePlacement,
  children,
  ...props
}: CardActionButtonProps) => {
  const contentProps = {
    heading,
    helperText,
    leadingIcon,
    leadingIconContainerColorScheme,
    badge,
    badgePlacement,
  };
  return (
    <button className={clsx(componentClassName, className)} {...props}>
      <CardActionContent
        trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
        {...contentProps}
      >
        {children}
      </CardActionContent>
    </button>
  );
};

CardActionButton.displayName = COMPONENT_NAME;
