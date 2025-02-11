import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { bodyTextPropDefs, BodyTextProps } from './BodyText.props';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'BodyText';
const componentClassName = withGlobalPrefix(componentName);

type BodyTextElement = ElementRef<'p'>;

export const BodyText = React.forwardRef<BodyTextElement, BodyTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'p',
    children,
    truncate,
    ...bodyTextProps
  } = extractProps(props, bodyTextPropDefs, textAlignPropDefs, textTransformPropDefs);

  return (
    <Slot
      ref={ref}
      className={clsx(componentClassName, className)}
      data-truncate={truncate ? '' : undefined}
      {...bodyTextProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});

BodyText.displayName = componentName;
