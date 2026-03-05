import { ComponentPropsWithRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ModalFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalFooter = ({ className, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className={cn(componentClassName, className)} {...props} />;
};

ModalFooter.displayName = COMPONENT_NAME;
