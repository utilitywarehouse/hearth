import * as React from 'react';
import clsx from 'clsx';
import { ModalFooterProps } from './Modal.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'ModalFooter';
const componentClassName = withClassnameGlobalPrefix(componentName);

export const ModalFooter: React.FC<ModalFooterProps> = ({ className, ...props }) => {
  return <div className={clsx(componentClassName, className)} {...props} />;
};

ModalFooter.displayName = componentName;
