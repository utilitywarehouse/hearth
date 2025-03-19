import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { LabelProps } from './Label.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Label';
const componentClassName = withGlobalPrefix(componentName);

type LabelElement = ElementRef<'label'>;

export const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const {
    children,
    as: Tag = 'label',
    disabled,
    disableUserSelect,
    className,
    ...labelProps
  } = extractProps(props, marginPropDefs);

  return (
    <BodyText
      asChild
      size="md"
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
    >
      <Tag ref={ref} {...labelProps}>
        {children}
      </Tag>
    </BodyText>
  );
});

Label.displayName = componentName;
