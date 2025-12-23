'use client';

import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { UnstyledIconButtonProps } from '../UnstyledIconButton/UnstyledIconButton.props';

const COMPONENT_NAME = 'AlertIconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AlertIconButton = ({
  children,
  label = 'Alert action',
  title = 'Alert action',
  className,
  ...props
}: UnstyledIconButtonProps) => {
  return (
    <UnstyledIconButton
      className={cn(componentClassName, className)}
      label={label}
      title={title}
      {...props}
    >
      {children || <ChevronRightSmallIcon />}
    </UnstyledIconButton>
  );
};

AlertIconButton.displayName = COMPONENT_NAME;
