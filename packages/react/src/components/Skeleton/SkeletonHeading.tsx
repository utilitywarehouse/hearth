'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { skeletonHeadingPropDefs, type SkeletonHeadingProps } from './SkeletonHeading.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { sizePropDefs } from '../../props/size.props';

const COMPONENT_NAME = 'SkeletonHeading';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonHeadingElement = ComponentRef<'div'>;

export const SkeletonHeading = forwardRef<SkeletonHeadingElement, SkeletonHeadingProps>(
  (props, ref) => {
    const { className, ...skeletonHeadingProps } = extractProps(
      props,
      skeletonHeadingPropDefs,
      marginPropDefs,
      sizePropDefs
    );
    return (
      <div ref={ref} className={cn(componentClassName, className)} {...skeletonHeadingProps} />
    );
  }
);

SkeletonHeading.displayName = COMPONENT_NAME;
