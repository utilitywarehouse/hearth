import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useStyleProps } from '../../hooks';
import { SpaceValue } from '../../types';
import { BodyText } from '../BodyText';

export interface UnorderedListProps extends ViewProps {
  children: ViewProps['children'];
  gap?: SpaceValue;
  bulletStyle?: ViewStyle;
}

const UnorderedList = ({ children, gap = '100', style, ...rest }: UnorderedListProps) => {
  const { computedStyles } = useStyleProps({ gap });
  return (
    <View style={[computedStyles, style]} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return (
            <View style={styles.listItemContainer}>
              <BodyText style={styles.bullet}>•</BodyText>
              {React.cloneElement(child as React.ReactElement<any>, {}) as ViewProps['children']}
            </View>
          );
        }
        return child;
      })}
    </View>
  );
};

UnorderedList.displayName = 'UnorderedList';

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 8,
    lineHeight: undefined, // Allow bullet to align with first line of text
  },
});

export default UnorderedList;
