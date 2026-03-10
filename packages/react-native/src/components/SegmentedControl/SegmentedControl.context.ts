import { createContext, useContext } from 'react';

export type SegmentedControlContextValue = {
  value?: string;
  select: (value: string) => void;
  disabled?: boolean;
  size: 'sm' | 'md';
  registerOptionLayout: (
    value: string,
    layout: { x: number; y: number; width: number; height: number }
  ) => void;
};

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export const useSegmentedControlContext = () => {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error('SegmentedControlOption must be used within SegmentedControl');
  }
  return context;
};
