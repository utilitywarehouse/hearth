import * as React from 'react';
import { BodyText } from '../BodyText/BodyText';
import { ProgressBarLabelProps } from './ProgressBarLabel.props';

const COMPONENT_NAME = 'ProgressBarLabel';

export const ProgressBarLabel: React.FC<ProgressBarLabelProps> = ({ label }) => {
  return <BodyText weight="semibold">{label}</BodyText>;
};

ProgressBarLabel.displayName = COMPONENT_NAME;
