import * as React from 'react';
import { BodyText } from '../BodyText/BodyText';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyTextProps } from '../BodyText/BodyText.props';

const COMPONENT_NAME = 'ProgressBarLabel';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarLabel: React.FC<Pick<BodyTextProps, 'children' | 'className'>> = ({
  className,
  ...props
}) => (
  <BodyText
    as="span"
    weight="semibold"
    className={clsx(componentClassName, className)}
    {...props}
  />
);

ProgressBarLabel.displayName = COMPONENT_NAME;
