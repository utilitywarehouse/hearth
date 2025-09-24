import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { LabelProps } from './Label.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'Label';
const componentClassName = withClassnameGlobalPrefix(componentName);

type LabelElement = ElementRef<'label'>;

export const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const {
    children,
    as: tag = 'label',
    disabled,
    disableUserSelect,
    className,
    fontWeight = 'regular',
    ...labelProps
  } = extractProps(props, marginPropDefs, textTransformPropDefs);

  return (
    <BodyText
      as={tag}
      ref={ref}
      size="md"
      weight={fontWeight}
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
      {...labelProps}
    >
      {children}
    </BodyText>
  );
});

Label.displayName = componentName;
