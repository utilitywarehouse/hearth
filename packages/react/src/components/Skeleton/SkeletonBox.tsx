'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Box } from '../Box/Box';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { SkeletonBoxProps } from './SkeletonBox.props';

const COMPONENT_NAME = 'SkeletonBox';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonBoxElement = ComponentRef<'div'>;

export const SkeletonBox = forwardRef<SkeletonBoxElement, SkeletonBoxProps>(
  ({ className, ...props }, ref) => {
    return <Box ref={ref} as="div" className={cn(componentClassName, className)} {...props} />;
  }
);

SkeletonBox.displayName = COMPONENT_NAME;
