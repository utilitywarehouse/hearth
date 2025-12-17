import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import type { HelperTextProps } from './HelperText.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const COMPONENT_NAME = 'HelperText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const HelperText = (props: HelperTextProps) => {
  const { children, disabled, disableUserSelect, className, ...helperTextProps } = extractProps(
    props,
    marginPropDefs,
    textAlignPropDefs,
    textTransformPropDefs
  );
  return (
    <BodyText
      size="md"
      as="span"
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
      {...helperTextProps}
    >
      {children}
    </BodyText>
  );
};

HelperText.displayName = COMPONENT_NAME;
