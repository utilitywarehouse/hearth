import * as React from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import clsx from 'clsx';

const COMPONENT_NAME = 'ProgressStepContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepContent = ({
  className,
  ...props
}: Omit<React.ComponentPropsWithRef<'div'>, 'color'>) => {
  return <BodyText className={clsx(componentClassName, className)} {...props} />;
};

ProgressStepContent.displayName = COMPONENT_NAME;
