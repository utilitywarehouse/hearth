'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { SkeletonBodyTextProps } from './SkeletonBodyText.props';

const COMPONENT_NAME = 'SkeletonBodyText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);
const lineClassName = withGlobalPrefix('SkeletonBodyTextLine');

type SkeletonBodyTextElement = ComponentRef<'div'>;

export const SkeletonBodyText = forwardRef<SkeletonBodyTextElement, SkeletonBodyTextProps>(
  ({ lines = 1, className, ...props }, ref) => {
    const lineCount = Math.max(1, Math.floor(lines));

    return (
      <div ref={ref} className={componentClassName} aria-hidden>
        {Array.from({ length: lineCount }, (_, index) => (
          <BodyText key={index} as="span" className={cn(lineClassName, className)} {...props}>
            {'\u00A0'}
          </BodyText>
        ))}
      </div>
    );
  }
);

SkeletonBodyText.displayName = COMPONENT_NAME;
