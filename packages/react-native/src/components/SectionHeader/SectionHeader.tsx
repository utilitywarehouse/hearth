import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Link } from '../Link';
import SectionHeaderProps from './SectionHeader.props';
import SectionHeaderTitle from './SectionHeaderHeading';
import SectionHeaderHelperText from './SectionHeaderHelperText';
import SectionHeaderTextContent from './SectionHeaderTextContent';

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
    gap: theme.components.sectionHeader.gap,
    alignItems: 'flex-start',
    width: '100%',
  },
}));

export default SectionHeader;
