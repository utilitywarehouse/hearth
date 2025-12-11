import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ModalFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalFooter = ({ className, ...props }: React.ComponentPropsWithRef<'div'>) => {
  return <div className={clsx(componentClassName, className)} {...props} />;
};

ModalFooter.displayName = COMPONENT_NAME;
