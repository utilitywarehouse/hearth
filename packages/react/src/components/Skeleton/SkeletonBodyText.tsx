'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { skeletonBodyTextPropDefs, type SkeletonBodyTextProps } from './SkeletonBodyText.props';
import { extractProps } from '../../helpers/extract-props';
import { Flex } from '../Flex/Flex';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'SkeletonBodyText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SkeletonBodyTextElement = ComponentRef<'div'>;

export const SkeletonBodyText = forwardRef<SkeletonBodyTextElement, SkeletonBodyTextProps>(
  (props, ref) => {
    const {
      lines = '1',
      className,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      width,
      maxWidth,
      minWidth,
      ...skeletonBodyTextProps
    } = extractProps(props, skeletonBodyTextPropDefs);

    const styleProps = {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      width,
      maxWidth,
      minWidth,
    };

    if (lines === '1') {
      return (
        <Box
          as="div"
          ref={ref}
          className={cn(componentClassName, className)}
          {...styleProps}
          {...skeletonBodyTextProps}
        />
      );
    }

    return (
      <Flex ref={ref} direction="column" gap="75" {...styleProps}>
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
