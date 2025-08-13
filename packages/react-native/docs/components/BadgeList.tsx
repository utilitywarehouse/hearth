import {
  Badge,
  BadgeText,
  Box,
  Flex,
  List,
  ListItem,
  ListItemContent,
  ListItemHelperText,
  ListItemIcon,
  ListItemLeadingContent,
  ListItemText,
  ListItemTrailingContent,
  ListItemTrailingIcon,
} from '../../src';

import {
  ChevronRightMediumIcon,
  ElectricityMediumIcon,
  GasMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const BadgeList = () => {
  return (
    <List>
      <ListItem onPress={() => console.log('pressed')} divider>
        <ListItemLeadingContent>
          <Box padding="300" borderRadius="lg" bg="energyBlue300">
            <ListItemIcon as={ElectricityMediumIcon} color="energyBlue600" />
          </Box>
        </ListItemLeadingContent>
        <ListItemContent>
          <ListItemText>Electricity</ListItemText>
          <Badge colorScheme="info">
            <BadgeText>Text</BadgeText>
          </Badge>
          <ListItemHelperText>Last reading 23/03/24</ListItemHelperText>
        </ListItemContent>
        <ListItemTrailingContent>
          <ListItemTrailingIcon as={ChevronRightMediumIcon} />
        </ListItemTrailingContent>
      </ListItem>
      <ListItem onPress={() => console.log('pressed')} divider={false}>
        <ListItemLeadingContent>
          <Box padding="300" borderRadius="lg" bg="energyBlue300">
            <ListItemIcon as={GasMediumIcon} color="energyBlue600" />
          </Box>
        </ListItemLeadingContent>
        <ListItemContent>
          <Flex direction="row" style={{ justifyContent: 'space-between' }}>
            <ListItemText>Gas</ListItemText>
            <Badge colorScheme="positive">
              <BadgeText>Smart meter</BadgeText>
            </Badge>
          </Flex>
          <ListItemHelperText>Last reading 23/03/24</ListItemHelperText>
        </ListItemContent>
        <ListItemTrailingContent>
          <ListItemTrailingIcon as={ChevronRightMediumIcon} />
        </ListItemTrailingContent>
      </ListItem>
    </List>
  );
};

export default BadgeList;
