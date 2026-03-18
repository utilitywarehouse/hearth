'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Box } from '../Box/Box';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { SkeletonProps } from './Skeleton.props';

const COMPONENT_NAME = 'Skeleton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonElement = ComponentRef<'div'>;

export const Skeleton = forwardRef<SkeletonElement, SkeletonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box ref={ref} as="div" aria-hidden className={cn(componentClassName, className)} {...props}>
        <div className="visually-hidden">loading</div>
        {children}
      </Box>
    );
  }
);

Skeleton.displayName = COMPONENT_NAME;
