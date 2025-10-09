import { createContext } from 'react';
import { DescriptionListProps } from './DescriptionList.props';

export type DescriptionListContextOptions = {
  direction: DescriptionListProps['direction'];
};

export const DescriptionListContext = createContext<DescriptionListContextOptions>({
  direction: 'row',
});
