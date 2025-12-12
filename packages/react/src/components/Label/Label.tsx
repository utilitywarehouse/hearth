import clsx from 'clsx';
import type { LabelProps } from './Label.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const COMPONENT_NAME = 'Label';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Label = (props: LabelProps) => {
  const {
    children,
    as: Tag = 'label',
    disabled,
    disableUserSelect,
    className,
    fontWeight = 'regular',
    ...labelProps
  } = extractProps(props, marginPropDefs, textTransformPropDefs);

  return (
    <BodyText
      asChild
      size="md"
      weight={fontWeight}
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
      {...labelProps}
    >
      <Tag>{children}</Tag>
    </BodyText>
  );
};

Label.displayName = COMPONENT_NAME;
