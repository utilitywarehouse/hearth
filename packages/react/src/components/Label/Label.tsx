import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import type { LabelProps } from './Label.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { Heading } from '../Heading/Heading';
import type { HeadingProps } from '../Heading/Heading.props';

const COMPONENT_NAME = 'Label';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type LabelElement = ComponentRef<'label'>;

export const Label = forwardRef<LabelElement, LabelProps>((props, ref) => {
  const {
    children,
    as: Tag = 'label',
    disabled,
    disableUserSelect,
    className,
    fontWeight = 'regular',
    variant = 'body',
    ...labelProps
  } = extractProps(props, marginPropDefs, textTransformPropDefs);

  if (variant === 'heading') {
    return (
      <Heading
        asChild
        size="md"
        className={cn(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        data-disable-user-select={disableUserSelect ? '' : undefined}
        {...(labelProps as HeadingProps)}
      >
        <Tag ref={ref}>{children}</Tag>
      </Heading>
    );
  }

  return (
    <BodyText
      asChild
      size="md"
      weight={fontWeight}
      className={cn(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
      {...labelProps}
    >
      <Tag ref={ref}>{children}</Tag>
    </BodyText>
  );
});

Label.displayName = COMPONENT_NAME;
