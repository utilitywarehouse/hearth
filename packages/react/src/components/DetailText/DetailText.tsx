import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { detailTextPropDefs, DetailTextProps } from './DetailText.props';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'DetailText';
const componentClassName = withGlobalPrefix(componentName);

type DetailTextElement = ElementRef<'span'>;

export const DetailText = React.forwardRef<DetailTextElement, DetailTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'span',
    children,
    ...detailTextProps
  } = extractProps(props, detailTextPropDefs, textAlignPropDefs, textTransformPropDefs);

  return (
    <Slot ref={ref} className={clsx(componentClassName, className)} {...detailTextProps}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});

DetailText.displayName = componentName;
