import { createContext, useContext } from 'react';

export interface DescriptionListContextValue {
  direction: 'row' | 'column';
  itemHeadingWidth?: number;
}

export const DescriptionListContext = createContext<DescriptionListContextValue | undefined>(
  undefined
);

export const useDescriptionListContext = () => {
  const ctx = useContext(DescriptionListContext);
  if (!ctx) {
    throw new Error('DescriptionListItem must be used within a DescriptionList');
  }
  return ctx;
};
