import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Link } from '../../Link';
import { useListContext } from '../List.context';
import ListHeadingProps from './ListHeading.props';
import ListHeadingHelperText from './ListHeadingHelperText';
import ListHeadingTextContent from './ListHeadingTextContent';
import ListHeadingTitle from './ListHeadingTitle';

const ListHeading = ({
  text,
  helperText,
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
}: ListHeadingProps) => {
  const { disabled } = useListContext();
  return (
    <View {...props} style={[styles.container, style]}>
      {children ? (
        children
      ) : (
        <>
          <ListHeadingTextContent>
            <ListHeadingTitle>{text}</ListHeadingTitle>
            {!!helperText && <ListHeadingHelperText>{helperText}</ListHeadingHelperText>}
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
};

ListHeading.displayName = 'ListHeading';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.sectionHeader.horizontalGap,
  },
}));

export default ListHeading;
