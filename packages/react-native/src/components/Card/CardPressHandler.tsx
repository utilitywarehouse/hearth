import { PropsWithChildren, useMemo } from 'react';
import { useCardContext } from './Card.context';
import { CardPressHandlerContext } from './CardPressHandler.context';

interface CardPressHandlerOwnProps {
  /** The handler to inherit from the child component when the `Card` is pressed. */
  handlerToInherit?: string;
}

/**
 * Wraps a child component so it inherits the `Card`'s pressed state, letting the child show an active appearance when the `Card` is pressed.
 */
const CardPressHandler = ({ children }: PropsWithChildren<CardPressHandlerOwnProps>) => {
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
