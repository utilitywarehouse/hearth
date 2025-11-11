import * as React from 'react';
import { BodyText } from '../BodyText/BodyText';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyTextProps } from '../BodyText/BodyText.props';

const COMPONENT_NAME = 'ProgressBarValue';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarValue: React.FC<Pick<BodyTextProps, 'children' | 'className'>> = ({
  className,
  ...props
}) => (
  <BodyText
    as="span"
    className={clsx(componentClassName, className)}
    aria-hidden="true"
    {...props}
  />
);

ProgressBarValue.displayName = COMPONENT_NAME;
