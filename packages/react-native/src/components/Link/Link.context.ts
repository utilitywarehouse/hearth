import { createContext, useContext } from 'react';
import type { LinkProps } from './Link.props';

export const LinkContext = createContext<{
  inverted?: LinkProps['inverted'];
  disabled?: LinkProps['disabled'];
  inline?: LinkProps['inline'];
  active?: boolean;
}>({});

export const useLinkContext = () => useContext(LinkContext);
