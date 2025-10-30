import { ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Badge } from '../Badge';
import { Helper } from '../Helper';
import SectionHeaderProps from './SectionHeader.props';
import SectionHeaderTitle from './SectionHeaderHeading';
import SectionHeaderHelperText from './SectionHeaderHelperText';
import SectionHeaderTextContent from './SectionHeaderTextContent';
import SectionHeaderTrailingContent from './SectionHeaderTrailingContent';

const SectionHeader = ({
  heading,
  helperText,
  children,
  style,
  trailingContent,
  badge,
  invalidText,
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
            {!!invalidText && (
              <Helper
                validationStatus="invalid"
                showIcon
                icon={ErrorCircleSmallIcon}
                text={invalidText || ''}
              />
            )}
          </SectionHeaderTextContent>
          {!!badge && <Badge {...badge} />}
          {!!trailingContent && (
            <SectionHeaderTrailingContent>{trailingContent}</SectionHeaderTrailingContent>
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
