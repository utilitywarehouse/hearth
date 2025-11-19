import { PropsWithChildren, useMemo } from 'react';
import { useCardContext } from './Card.context';
import { CardPressHandlerContext } from './CardPressHandler.context';

const CardPressHandler = ({ children }: PropsWithChildren<{ handlerToInherit?: string }>) => {
  const { pressed } = useCardContext();
  const context = useMemo(
    () => ({
      pressed,
    }),
    [pressed]
  );
  return (
    <CardPressHandlerContext.Provider value={context}>{children}</CardPressHandlerContext.Provider>
  );
};

CardPressHandler.displayName = 'CardPressHandler';

export default CardPressHandler;
