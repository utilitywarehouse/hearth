import { Flex, BodyText } from '@utilitywarehouse/hearth-react';
import { StarMediumIcon } from '@utilitywarehouse/hearth-react-icons';

export interface PromoBannerProps {
  /**
   * The promo message shown next to the icon.
   */
  label: string;
}

export const PromoBanner = ({ label }: PromoBannerProps) => {
  return (
    <Flex direction="row" alignItems="center" spacing="lg">
      <StarMediumIcon />
      <BodyText size="md">{label}</BodyText>
    </Flex>
  );
};
