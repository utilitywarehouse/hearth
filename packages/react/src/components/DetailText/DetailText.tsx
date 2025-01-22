import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { detailTextPropDefs, DetailTextProps } from './DetailText.props';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const componentName = 'DetailText';
const componentClassName = withGlobalPrefix(componentName);

type DetailTextElement = ElementRef<'span'>;

/**
 * `DetailText` renders the monospace UW font, to be used for detail text.
 */
export const DetailText = React.forwardRef<DetailTextElement, DetailTextProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'span',
    children,
    ...detailTextProps
  } = extractProps(props, detailTextPropDefs, textAlignPropDefs);

  return (
    <Slot ref={ref} className={clsx(componentClassName, className)} {...detailTextProps}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});

DetailText.displayName = componentName;
