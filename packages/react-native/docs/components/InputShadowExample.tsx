import { SearchMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { StyleSheet } from 'react-native-unistyles';
import { Box, Input } from '../../src';

const InputShadowExample = () => {
  return (
    <Box padding="md">
      <Input placeholder="Input with shadow" style={styles.input} leadingIcon={SearchMediumIcon} />
    </Box>
  );
};

const styles = StyleSheet.create(theme => ({
  input: {
    boxShadow: theme.helpers.shadow.functional,
  },
}));

export default InputShadowExample;
