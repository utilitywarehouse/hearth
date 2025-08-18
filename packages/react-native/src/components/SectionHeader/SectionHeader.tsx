import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import SectionHeaderTitle from './SectionHeaderTitle';
import SectionHeaderHelperText from './SectionHeaderHelperText';
import SectionHeaderProps from './SectionHeader.props';
import SectionHeaderTextContent from './SectionHeaderTextContent';
import { Link } from '..';

const SectionHeader = ({
  heading,
  helperText,
  children,
  style,
  linkHref,
  linkIcon,
  linkIconPosition,
  linkOnPress,
  linkShowIcon,
  linkTarget,
  linkText,
  ...props
}: SectionHeaderProps) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children ? (
        children
      ) : (
        <>
          <SectionHeaderTextContent>
            <SectionHeaderTitle>{heading}</SectionHeaderTitle>
            {!!helperText && <SectionHeaderHelperText>{helperText}</SectionHeaderHelperText>}
          </SectionHeaderTextContent>
          {!!linkText && (
            <Link
              href={linkHref}
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

SectionHeader.displayName = 'SectionHeader';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.list.heading.gap,
  },
}));

export default SectionHeader;
