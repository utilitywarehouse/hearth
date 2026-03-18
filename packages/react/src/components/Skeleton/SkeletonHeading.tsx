'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { skeletonHeadingPropDefs, type SkeletonHeadingProps } from './SkeletonHeading.props';
import { extractProps } from '../../helpers/extract-props';

const COMPONENT_NAME = 'SkeletonHeading';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonHeadingElement = ComponentRef<'h2'>;

export const SkeletonHeading = forwardRef<SkeletonHeadingElement, SkeletonHeadingProps>(
  (props, ref) => {
    const { className, ...skeletonHeadingProps } = extractProps(props, skeletonHeadingPropDefs);
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(componentClassName, className)}
        {...skeletonHeadingProps}
      />
    );
  }
);

SkeletonHeading.displayName = COMPONENT_NAME;
