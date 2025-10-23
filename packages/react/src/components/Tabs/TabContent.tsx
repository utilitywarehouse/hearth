import * as React from 'react';
import clsx from 'clsx';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabContentProps } from './TabContent.props';

const COMPONENT_NAME = 'TabPanel';
const contentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const { className, keepMounted, ...rest } = props;
  const RTabsContent = RadixTabs.Content as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <RTabsContent
      ref={ref}
      className={clsx(contentClassName, className)}
      forceMount={keepMounted ? true : undefined}
      {...(rest as unknown as Record<string, unknown>)}
    />
  );
});

TabContent.displayName = 'TabContent';
