import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { tabsPropDefs, type TabsProps } from './Tabs.props';

const COMPONENT_NAME = 'Tabs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TabsElement = ElementRef<'div'>;

export const Tabs = React.forwardRef<TabsElement, TabsProps>((props, ref) => {
  const {
    className,
    activationMode = 'automatic',
    ...tabsProps
  } = extractProps(props, tabsPropDefs, marginPropDefs) as TabsProps & {
    activationMode?: 'automatic' | 'manual';
  };

  return (
    <RadixTabs.Root
      ref={ref}
      className={clsx(componentClassName, className)}
      activationMode={activationMode}
      {...(tabsProps as React.ComponentProps<typeof RadixTabs.Root>)}
    />
  );
});

Tabs.displayName = COMPONENT_NAME;
