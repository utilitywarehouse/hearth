import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useStyleProps } from '../../hooks';
import { SpaceValue } from '../../types';
import { BodyText } from '../BodyText';

export interface OrderedListProps extends ViewProps {
  children: ViewProps['children'];
  gap?: SpaceValue;
  bulletStyle?: ViewStyle;
}

const OrderedList = ({ children, gap = '100', style, ...rest }: OrderedListProps) => {
  const { computedStyles } = useStyleProps({ gap });
  let itemNumber = 0;
  return (
    <View style={[computedStyles, style]} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          itemNumber++;
          return (
            <View style={styles.listItemContainer}>
              <BodyText style={styles.number}>{`${itemNumber}.`}</BodyText>
              {React.cloneElement(child as React.ReactElement<any>, {}) as ViewProps['children']}
            </View>
          );
        }
        return child;
      })}
    </View>
  );
};

OrderedList.displayName = 'OrderedList';

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  number: {
    marginRight: 8,
    lineHeight: undefined, // Allow number to align with first line of text
  },
});

export default OrderedList;
