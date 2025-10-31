import * as React from 'react';
import { BodyText } from '../BodyText/BodyText';
import { ProgressBarValueProps } from './ProgressBarValue.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ProgressBarValue';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarValue: React.FC<ProgressBarValueProps> = ({ value }) => {
  return <BodyText className={componentClassName}>{value}</BodyText>;
};

ProgressBarValue.displayName = COMPONENT_NAME;
