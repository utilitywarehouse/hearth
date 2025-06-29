import * as React from 'react';
import clsx from 'clsx';
import { ModalFooterProps } from './Modal.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'ModalFooter';
const componentClassName = withGlobalPrefix(componentName);

export const ModalFooter: React.FC<ModalFooterProps> = ({ className, ...props }) => {
  return <div className={clsx(componentClassName, className)} {...props} />;
};

ModalFooter.displayName = componentName;
