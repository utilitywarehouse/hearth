import * as React from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import type { ProgressStepContentProps } from './ProgressStepContent.props';
import { ProgressStepperContext } from './ProgressStepper.context';

const COMPONENT_NAME = 'ProgressStepContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepContent: React.FC<ProgressStepContentProps> = ({ label }) => {
  const { hideLabels } = React.useContext(ProgressStepperContext);

  return (
    <BodyText
      className={`${componentClassName}`}
      data-visually-hidden={hideLabels ? '' : undefined}
    >
      {label}
    </BodyText>
  );
};

ProgressStepContent.displayName = COMPONENT_NAME;
