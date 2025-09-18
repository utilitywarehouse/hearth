import {
  BodyText,
  Box,
  Card,
  CardAction,
  Flex,
  Heading,
  Link,
} from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

interface ProjectBannerProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

const ProjectBanner = ({ image, link, title, description }: ProjectBannerProps) => {
  return (
    <Card as="li" variant="emphasis" colorScheme="neutralStrong" gap="200">
      <Box
        backgroundColor="warmWhite200"
        borderRadius="sm"
        borderStyle="solid"
        borderWidth="2"
        borderColor="grey1000"
        width="100px"
        height="100px"
        minWidth="100px"
        minHeight="100px"
      >
        <img src={image} width="100%" height="auto" />
      </Box>
      <Flex direction="column" gap="200">
        <Flex gap="50" direction="column">
          <Heading size="sm">{title}</Heading>
          <BodyText size="md">{description}</BodyText>
        </Flex>
        <CardAction asChild>
          <Link href={link}>
            Learn more
            <ChevronRightSmallIcon />
          </Link>
        </CardAction>
      </Flex>
    </Card>
  );
};

export default ProjectBanner;
