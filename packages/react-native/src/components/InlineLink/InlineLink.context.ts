import { createContext, useContext } from 'react';
import type { InlineLinkProps } from './InlineLink.props';

export const InlineLinkContext = createContext<{
  inverted?: InlineLinkProps['inverted'];
  disabled?: InlineLinkProps['disabled'];
  active?: boolean;
}>({});

export const useInlineLinkContext = () => useContext(InlineLinkContext);
