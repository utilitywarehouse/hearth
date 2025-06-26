import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DialogFooterProps } from './Dialog.props';

const componentName = 'DialogFooter';
const componentClassName = withGlobalPrefix(componentName);

export const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => {
  return <div className={clsx(componentClassName, className)} {...props} />;
};

DialogFooter.displayName = componentName;
