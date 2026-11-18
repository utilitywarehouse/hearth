import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CardActionsContext } from './CardActions.context';
import { addActionId, getFirstActionId, removeActionId } from './CardActions.utils';

const CardActions = ({ children, style, ...props }: PropsWithChildren<ViewProps>) => {
  const orderRef = useRef<string[]>([]);
  const [firstActionId, setFirstActionId] = useState<string | undefined>(undefined);

  const registerAction = useCallback((id: string) => {
    orderRef.current = addActionId(orderRef.current, id);
    const nextFirst = getFirstActionId(orderRef.current);
    setFirstActionId(prev => (prev === nextFirst ? prev : nextFirst));
    return () => {
      orderRef.current = removeActionId(orderRef.current, id);
      const nextFirst = getFirstActionId(orderRef.current);
      setFirstActionId(prev => (prev === nextFirst ? prev : nextFirst));
    };
  }, []);

  return (
    <CardActionsContext.Provider value={{ firstActionId, registerAction }}>
      <View {...props} style={[styles.container, style]}>
        {children}
      </View>
    </CardActionsContext.Provider>
  );
};

CardActions.displayName = 'CardActions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CardActions;
