'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Heading } from '../Heading/Heading';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { SkeletonHeadingProps } from './SkeletonHeading.props';

const COMPONENT_NAME = 'SkeletonHeading';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonHeadingElement = ComponentRef<'h2'>;

export const SkeletonHeading = forwardRef<SkeletonHeadingElement, SkeletonHeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <Heading ref={ref} aria-hidden className={cn(componentClassName, className)} {...props}>
        {'\u00A0'}
      </Heading>
    );
  }
);

SkeletonHeading.displayName = COMPONENT_NAME;
