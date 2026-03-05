'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { tabsPropDefs } from './Tabs.props';
import type { TabsProps } from './Tabs.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'Tabs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TabsElement = ComponentRef<'div'>;

export const Tabs = forwardRef<TabsElement, TabsProps>((props, ref) => {
  const {
    className,
    activationMode = 'automatic',
    spacing = 'xl',
    ...tabsProps
  } = extractProps(props, tabsPropDefs);

  return (
    <Flex asChild direction="column" spacing={spacing}>
      <RadixTabs.Root
        ref={ref}
        className={cn(componentClassName, className)}
        activationMode={activationMode}
        {...tabsProps}
      />
    </Flex>
  );
});

Tabs.displayName = COMPONENT_NAME;
