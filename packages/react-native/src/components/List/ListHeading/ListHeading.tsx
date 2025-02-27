import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import ListHeadingTitle from './ListHeadingTitle';
import ListHeadingSupportingText from './ListHeadingSupportingText';
import ListHeadingProps from './ListHeading.props';
import ListHeadingTextContent from './ListHeadingTextContent';
import { Link } from '../../Link';
import { useListContext } from '../List.context';

const ListHeading = forwardRef<View, ListHeadingProps>(
  (
    {
      text,
      supportingText,
      children,
      style,
      linkDisabled,
      linkHref,
      linkIcon,
      linkIconPosition,
      linkOnPress,
      linkShowIcon,
      linkTarget,
      linkText,
      ...props
    },
    ref
  ) => {
    const { disabled } = useListContext();
    return (
      <View ref={ref} {...props} style={[styles.container, style]}>
        {children ? (
          children
        ) : (
          <>
            <ListHeadingTextContent>
              <ListHeadingTitle>{text}</ListHeadingTitle>
              {!!supportingText && (
                <ListHeadingSupportingText>{supportingText}</ListHeadingSupportingText>
              )}
            </ListHeadingTextContent>
            {!!linkText && (
              <Link
                href={linkHref}
                disabled={disabled ?? linkDisabled}
                onPress={linkOnPress}
                icon={linkIcon}
                showIcon={linkShowIcon}
                iconPosition={linkIconPosition}
                target={linkTarget}
              >
                {linkText}
              </Link>
            )}
          </>
        )}
      </View>
    );
  }
);

ListHeading.displayName = 'ListHeading';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.list.heading.gap,
  },
}));

export default ListHeading;
