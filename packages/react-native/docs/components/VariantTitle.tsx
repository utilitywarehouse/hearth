import { ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Box, DetailText } from '../../src';

const VariantTitle = ({
  title,
  upperCase = true,
  invert = false,
  children,
}: {
  title: string;
  upperCase?: boolean;
  invert?: boolean;
  children: ViewProps['children'];
}) => {
  styles.useVariants({ invert });
  return (
    <Box gap="100" w="full">
      <DetailText textTransform={upperCase ? 'uppercase' : 'none'} size="sm" style={styles.text}>
        {title}
      </DetailText>
      {children}
    </Box>
  );
};

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.secondary,
    variants: {
      invert: {
        true: {
          color: theme.color.warmWhite[50],
        },
      },
    },
  },
}));

export default VariantTitle;
