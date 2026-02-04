import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CardActionsContext } from './CardActions.context';

const CardActions = ({ children, style, ...props }: PropsWithChildren<ViewProps>) => {
  const orderRef = useRef<string[]>([]);
  const [firstActionId, setFirstActionId] = useState<string | undefined>(undefined);

  const registerAction = useCallback((id: string) => {
    if (!orderRef.current.includes(id)) {
      orderRef.current.push(id);
    }
    const nextFirst = orderRef.current[0];
    setFirstActionId(prev => (prev === nextFirst ? prev : nextFirst));
    return () => {
      orderRef.current = orderRef.current.filter(currentId => currentId !== id);
      const nextFirst = orderRef.current[0];
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
