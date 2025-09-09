import { createContext, useContext } from 'react';
import { SharedValue } from 'react-native-reanimated';

export interface TabsContextValue {
  value: string | undefined;
  size: 'md' | 'lg';
  disabled?: boolean;
  select: (value: string) => void;
  registerTabLayout: (
    value: string,
    layout: { x: number; y: number; width: number; height: number }
  ) => void;
  getTabLayout: (
    value: string
  ) => { x: number; y: number; width: number; height: number } | undefined;
  indicatorXSV: SharedValue<number>;
  indicatorSizeSV: SharedValue<number>;
}

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab / TabPanel must be used within Tabs');
  return ctx;
};
