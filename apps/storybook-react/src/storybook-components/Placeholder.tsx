import { Flex, FlexProps } from '@utilitywarehouse/hearth-react';

export const Placeholder = (props: FlexProps) => {
  return (
    <Flex
      borderRadius="xs"
      borderWidth="2"
      borderColor="strong"
      backgroundColor="brand"
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
};
