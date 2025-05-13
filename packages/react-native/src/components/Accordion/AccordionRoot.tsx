import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import AccordionContext from './Accordion.context';
import { AccordionProps } from './Accordion.props';
import { StyleSheet } from 'react-native-unistyles';

export const AccordionRoot = forwardRef<View, AccordionProps>(
  ({ children, noPadding, disabled, contentNoPadding, ...props }, ref) => {
    const context = useMemo(
      () => ({ noPadding, disabled, contentNoPadding }),
      [noPadding, disabled, contentNoPadding]
    );
    return (
      <AccordionContext.Provider value={context}>
        <View ref={ref} style={styles.root} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

AccordionRoot.displayName = 'AccordionRoot';

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});

export default AccordionRoot;
