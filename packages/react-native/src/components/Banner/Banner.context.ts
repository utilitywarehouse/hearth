import { createContext, useContext } from 'react';

const BannerContext = createContext<{ direction: 'horizontal' | 'vertical' }>({
  direction: 'horizontal',
});

export const useBannerContext = () => {
  return useContext(BannerContext);
};

export default BannerContext;
