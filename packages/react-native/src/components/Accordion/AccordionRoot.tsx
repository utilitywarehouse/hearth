import { useMemo } from 'react';
import { View } from 'react-native';
import AccordionContext from './Accordion.context';
import { AccordionProps } from './Accordion.props';
import { StyleSheet } from 'react-native-unistyles';

type AccordionRootProps = AccordionProps & {
  expandedValues?: string[];
  toggleItem?: (value: string, disabled?: boolean) => void;
};

export const AccordionRoot = ({
  children,
  noPadding,
  disabled,
  contentNoPadding,
  expandedValues,
  toggleItem,
  ...props
}: AccordionRootProps) => {
  const context = useMemo(
    () => ({ noPadding, disabled, contentNoPadding, expandedValues, toggleItem }),
    [noPadding, disabled, contentNoPadding, expandedValues, toggleItem]
  );
  return (
    <AccordionContext.Provider value={context}>
      <View style={styles.root} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

AccordionRoot.displayName = 'AccordionRoot';

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});

export default AccordionRoot;
