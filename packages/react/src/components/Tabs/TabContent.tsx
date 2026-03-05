'use client';

import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabContentProps } from './Tabs.props';

const COMPONENT_NAME = 'TabContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TabContentElement = ComponentRef<'div'>;

export const TabContent = React.forwardRef<TabContentElement, TabContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.Content ref={ref} className={cn(componentClassName, className)} {...props} />
    );
  }
);

TabContent.displayName = COMPONENT_NAME;
