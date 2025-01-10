import React from 'react';

import './button.css';
import { Text } from 'react-native';
import { Center, Button as RNButton, Box, Badge } from '../components';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <Box bg="$apple400" p={4}>
      <Badge>Badge</Badge>
      <RNButton onPress={() => alert('yeah')}>Test</RNButton>
      <Center backgroundColor="$red300">{label}</Center>
      <Text>label</Text>
    </Box>
  );
};
