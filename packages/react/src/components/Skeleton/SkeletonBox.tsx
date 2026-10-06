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

/**
 * Use SkeletonBox as a loading placeholder for shapes such as images, avatars,
 * or other rectangular or circular content, inside a Skeleton wrapper. For
 * text placeholders, use SkeletonHeading or SkeletonBodyText instead.
 *
 * @summary A loading placeholder for images, avatars, and other shaped content.
 */
export const SkeletonBox = forwardRef<SkeletonBoxElement, SkeletonBoxProps>(
  ({ className, ...props }, ref) => {
    return <Box ref={ref} as="div" className={cn(componentClassName, className)} {...props} />;
  }
);

SkeletonBox.displayName = COMPONENT_NAME;
