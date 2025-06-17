import { PropsWithChildren, useMemo } from 'react';
import { CardActionContext } from './CardAction.context';
import { useCardContext } from './Card.context';

const CardAction = ({ children }: PropsWithChildren<{ actionToInherit?: string }>) => {
  const { pressed } = useCardContext();
  const context = useMemo(
    () => ({
      pressed,
    }),
    [pressed]
  );
  return <CardActionContext.Provider value={context}>{children}</CardActionContext.Provider>;
};

CardAction.displayName = 'CardAction';

export default CardAction;
