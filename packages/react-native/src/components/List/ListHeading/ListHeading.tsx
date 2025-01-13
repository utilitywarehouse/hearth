import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { StyleSheet, Variants } from 'react-native-unistyles';
import { useListContext } from '../List.context';
import ListHeadingTitle from './ListHeadingTitle';
import ListHeadingSupportingText from './ListHeadingSupportingText';
import ListHeadingProps from './ListHeading.props';

const ListHeading = forwardRef<View, ListHeadingProps>(
  ({ text, supportingText, children, style, ...props }, ref) => {
    const listContext = useListContext();
    return (
      <Variants variants={{ container: listContext?.container }}>
        <View ref={ref} {...props} style={[styles.container, style]}>
          {children ? (
            children
          ) : (
            <>
              <ListHeadingTitle>{text}</ListHeadingTitle>
              {!!supportingText && (
                <ListHeadingSupportingText>{supportingText}</ListHeadingSupportingText>
              )}
            </>
          )}
        </View>
      </Variants>
    );
  }
);

ListHeading.displayName = 'ListHeading';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.space[1],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[4],
    paddingBottom: theme.space[3],
    variants: {
      container: {
        full: {},
        card: {
          paddingLeft: theme.space[0],
        },
      },
    },
  },
}));

export default ListHeading;
