import * as React from 'react';
import { reactIcons } from '../../utils/react-icons';
import { useState } from 'react';
import { IconsGrid } from './IconsGrid';
import { Box, Flex, SearchInput } from '@utilitywarehouse/hearth-react';
import { RadioGroup, Radio } from '@utilitywarehouse/web-ui';

export const IconsDisplay = () => {
  const [iconName, setIconName] = useState('');

  const iconSizes = [
    { label: 'All icon sizes', value: '' },
    { label: 'Small (20px)', value: 'small' },
    { label: 'Medium (24px)', value: 'medium' },
    // { label: 'Large (48px)', value: 'large' },
  ];
  const [iconSize, setIconSize] = useState('');

  const icons = reactIcons
    .filter(icon => {
      if (!iconName) return true;
      return icon.displayName?.toLowerCase().includes(iconName);
    })
    .filter(icon => {
      if (!iconSize) return true;
      return icon.displayName?.toLowerCase().includes(iconSize);
    });

  const iconImports = [
    { label: 'Hearth React', value: 'react' },
    { label: 'Hearth React Native', value: 'react-native' },
    { label: 'SVG', value: 'svg' },
  ];
  const [iconImport, setIconImport] = useState<'react' | 'react-native' | 'svg'>(
    iconImports[0].value as 'react' | 'react-native' | 'svg'
  );

  return (
    <Box background="white">
      <Flex direction="column" gap="400">
        <Flex direction="column" gap="200">
          <Box width="400px">
            <SearchInput
              id="icons-search"
              label="Search icons"
              value={iconName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIconName(event.target.value);
              }}
            />
          </Box>
          <Flex gap={6} align="start">
            <RadioGroup
              label="Filter by icon size"
              value={iconSize}
              onValueChange={setIconSize}
              defaultValue=""
            >
              {iconSizes.map(size => (
                <Radio key={size.value} value={size.value} label={size.label} />
              ))}
            </RadioGroup>
            <Box width="400px">
              <RadioGroup
                label="Preferred icon library"
                helperText="You can choose what is copied to your clipboard when clicking on an icon; the import path from the React or React Native libraries, or the SVG code."
                helperTextPosition="bottom"
                value={iconImport}
                onValueChange={value => setIconImport(value as 'react' | 'react-native' | 'svg')}
                defaultValue={iconImports[0].value}
              >
                {iconImports.map(ii => (
                  <Radio key={ii.value} value={ii.value} label={ii.label} />
                ))}
              </RadioGroup>
            </Box>
          </Flex>
        </Flex>
        <IconsGrid icons={icons} lib={iconImport} />
      </Flex>
    </Box>
  );
};
