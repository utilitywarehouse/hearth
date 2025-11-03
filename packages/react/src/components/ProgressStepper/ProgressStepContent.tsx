import * as React from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import type { ProgressStepContentProps } from './ProgressStepContent.props';

const COMPONENT_NAME = 'ProgressStepContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepContent: React.FC<ProgressStepContentProps> = ({ label }) => {
  return <BodyText className={`${componentClassName}`}>{label}</BodyText>;
};

ProgressStepContent.displayName = COMPONENT_NAME;
