import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemLeadingContent,
  ListItemSupportingText,
  ListItemText,
  ListItemTrailingContent,
  ListItemTrailingIcon,
  ListItemContent,
  Badge,
  BadgeText,
  Flex,
  Box,
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
          <Box padding="300" borderRadius="lg" bg={'energyGreen'}>
            <ListItemIcon as={ElectricityMediumIcon} color="green900" />
          </Box>
        </ListItemLeadingContent>
        <ListItemContent>
          <ListItemText>Electricity</ListItemText>
          <Badge colorScheme="blue">
            <BadgeText>Text</BadgeText>
          </Badge>
          <ListItemSupportingText>Last reading 23/03/24</ListItemSupportingText>
        </ListItemContent>
        <ListItemTrailingContent>
          <ListItemTrailingIcon as={ChevronRightMediumIcon} />
        </ListItemTrailingContent>
      </ListItem>
      <ListItem onPress={() => console.log('pressed')} divider={false}>
        <ListItemLeadingContent>
          <Box padding="300" borderRadius="lg" bg={'energyGreen'}>
            <ListItemIcon as={GasMediumIcon} color="green900" />
          </Box>
        </ListItemLeadingContent>
        <ListItemContent>
          <Flex direction="row" style={{ justifyContent: 'space-between' }}>
            <ListItemText>Gas</ListItemText>
            <Badge colorScheme="green">
              <BadgeText>Smart meter</BadgeText>
            </Badge>
          </Flex>
          <ListItemSupportingText>Last reading 23/03/24</ListItemSupportingText>
        </ListItemContent>
        <ListItemTrailingContent>
          <ListItemTrailingIcon as={ChevronRightMediumIcon} />
        </ListItemTrailingContent>
      </ListItem>
    </List>
  );
};

export default BadgeList;
