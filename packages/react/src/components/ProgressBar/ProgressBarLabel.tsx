import * as React from 'react';
import { BodyText } from '../BodyText/BodyText';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyTextProps } from '../BodyText/BodyText.props';

const COMPONENT_NAME = 'ProgressBarLabel';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarLabel: React.FC<Pick<BodyTextProps, 'children' | 'id'>> = props => (
  <BodyText as="span" weight="semibold" className={componentClassName} {...props} />
);

ProgressBarLabel.displayName = COMPONENT_NAME;
