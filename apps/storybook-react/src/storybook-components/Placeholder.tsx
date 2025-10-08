import { Flex, FlexProps } from '@utilitywarehouse/hearth-react';

export const Placeholder = (props: FlexProps) => {
  return (
    <Flex
      borderRadius="xs"
      borderWidth="1"
      borderStyle="solid"
      borderColor="subtle"
      height="100%"
      alignItems="center"
      justifyContent="center"
      backgroundColor="secondary"
      {...props}
    />
  );
};
