import { IconContainer, List, ListItem } from '../../src';

import { ElectricityMediumIcon, GasMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const BadgeList = () => {
  return (
    <List>
      <ListItem
        heading="Electricity"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('pressed')}
        leadingContent={
          <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={{ text: 'Text' }}
      />
      <ListItem
        heading="Gas"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('pressed')}
        leadingContent={
          <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={{ text: 'Smart Meter' }}
      />
    </List>
  );
};

export default BadgeList;
