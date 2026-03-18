'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { skeletonBodyTextPropDefs, type SkeletonBodyTextProps } from './SkeletonBodyText.props';
import { extractProps } from '../../helpers/extract-props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'SkeletonBodyText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonBodyTextElement = ComponentRef<'div'>;

export const SkeletonBodyText = forwardRef<SkeletonBodyTextElement, SkeletonBodyTextProps>(
  (props, ref) => {
    const {
      lines = '1',
      className,
      ...skeletonBodyTextProps
    } = extractProps(props, skeletonBodyTextPropDefs);

    if (lines === '1') {
      return (
        <div ref={ref} className={cn(componentClassName, className)} {...skeletonBodyTextProps} />
      );
    }

    return (
      <Flex ref={ref} direction="column" gap="75">
        {Array.from({ length: Number(lines) }, (_, index) => (
          <div
            key={index}
            className={cn(componentClassName, className)}
            {...skeletonBodyTextProps}
          />
        ))}
      </Flex>
    );
  }
);

SkeletonBodyText.displayName = COMPONENT_NAME;
