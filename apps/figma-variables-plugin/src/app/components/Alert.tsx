import { BodyText, Box } from '@utilitywarehouse/hearth-react';
import React from 'react';

interface AlertProps {
  colorScheme: 'green' | 'red' | 'blue';
  text: string;
}

export function Alert({ colorScheme, text }: AlertProps) {
  const colorSchemeMap = {
    green: {
      backgroundColor: 'green100',
      borderColor: 'green700',
      textColor: 'green900',
    },
    red: {
      backgroundColor: 'red100',
      borderColor: 'red700',
      textColor: 'red900',
    },
    blue: {
      backgroundColor: 'blue100',
      borderColor: 'blue700',
      textColor: 'blue900',
    },
  } as const;

  const colors = colorSchemeMap[colorScheme];

  return (
    <Box
      backgroundColor={colors.backgroundColor}
      borderColor={colors.borderColor}
      borderStyle="solid"
      borderWidth="2"
      borderRadius="sm"
      padding="200"
    >
      {/* @ts-expect-error - type */}
      <BodyText color={colors.textColor} size="sm">
        {text}
      </BodyText>
    </Box>
  );
}
