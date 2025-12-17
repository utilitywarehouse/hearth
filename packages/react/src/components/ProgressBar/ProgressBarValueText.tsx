import { BodyText } from '../BodyText/BodyText';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyTextProps } from '../BodyText/BodyText.props';

const COMPONENT_NAME = 'ProgressBarValueText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarValueText = (props: Pick<BodyTextProps, 'children'>) => (
  <BodyText as="span" className={componentClassName} aria-hidden="true" {...props} />
);

ProgressBarValueText.displayName = COMPONENT_NAME;
