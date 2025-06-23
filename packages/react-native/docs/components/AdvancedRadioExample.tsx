import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import {
  Badge,
  BodyText,
  Box,
  Heading,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  type RadioProps as NativeUIRadioProps,
} from '../../src';

import { TextProps, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface RadioProps {
  currentValue: string;
}

const styles = StyleSheet.create(({ colorMode, color, borderRadius, borderWidth, space }) => ({
  radio: {
    borderWidth: borderWidth[2],
    borderColor: colorMode === 'light' ? color.grey[500] : color.grey[700],
    borderRadius: borderRadius.xl,
    padding: space[200],
    variants: {
      checked: {
        true: {
          borderColor: colorMode === 'light' ? color.green[500] : color.green[700],
        },
      },
    },
  },
  indicator: {
    variants: {
      checked: {
        true: {
          backgroundColor: colorMode === 'light' ? color.green[500] : color.green[700],
          borderColor: colorMode === 'light' ? color.green[500] : color.green[700],
        },
      },
    },
  },
  heading: {
    marginBottom: space[100],
  },
  badge: {
    marginRight: space[200],
    alignSelf: 'flex-end',
  },
}));

const CustomRadio = ({
  children,
  currentValue,
  ...props
}: RadioProps &
  Omit<
    NativeUIRadioProps,
    'label' | 'helperText' | 'helperIcon' | 'invalidText' | 'validText' | 'showValidationIcon'
  >) => {
  styles.useVariants({ checked: currentValue === props.value });
  return (
    <Radio style={styles.radio} {...props}>
      <Box flexDirection="row" flex={1}>
        <Box pr="200" flex={1}>
          {children}
        </Box>
        <RadioIndicator style={styles.indicator}>
          <RadioIcon as={TickSmallIcon} color="white" />
        </RadioIndicator>
      </Box>
    </Radio>
  );
};

const BulletListItem = ({ children }: { children: TextProps['children'] }) => (
  <BodyText>
    {'\u2022'} {children}
  </BodyText>
);

const BulletList = ({ children }: { children: ViewProps['children'] }) => (
  <Box pl="200" gap="100">
    {children}
  </Box>
);

const AdvancedRadioExample = () => {
  const [value, setValue] = useState('Option 1');

  const handleChange = (val: string) => setValue(val);

  return (
    <RadioGroup onChange={handleChange} value={value} gap="200">
      <Box>
        <Badge colorScheme={value === 'Option 1' ? 'green' : 'grey'} flatBase style={styles.badge}>
          Recommended
        </Badge>
        <CustomRadio value="Option 1" currentValue={value}>
          <Heading size="md" style={styles.heading}>
            Instant bank transfer
          </Heading>
          <BulletList>
            <BulletListItem>Receive your money instantly</BulletListItem>
            <BulletListItem>No fees</BulletListItem>
            <BulletListItem>Available 24/7</BulletListItem>
          </BulletList>
        </CustomRadio>
      </Box>
      <CustomRadio value="Option 2" currentValue={value}>
        <Heading size="md" style={styles.heading}>
          Debit card payment
        </Heading>
        <BulletList>
          <BulletListItem>£0.35 fee</BulletListItem>
          <BulletListItem>Available 24/7</BulletListItem>
        </BulletList>
      </CustomRadio>
    </RadioGroup>
  );
};

export default AdvancedRadioExample;
