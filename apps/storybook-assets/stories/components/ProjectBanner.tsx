import { Card, CardBannerContent, CardInteraction, Link } from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils';

interface ProjectBannerProps {
  to: string;
  heading: string;
  description: string;
}

const ProjectBanner = ({ to, heading, description }: ProjectBannerProps) => {
  return (
    <li>
      <Card variant="emphasis" colorScheme="neutralStrong" direction="column" gap="200">
        <CardBannerContent heading={heading} description={description}>
          <CardInteraction>
            <StorybookLink as={Link} to={to}>
              Learn more
              <ChevronRightSmallIcon />
            </StorybookLink>
          </CardInteraction>
        </CardBannerContent>
      </Card>
    </li>
  );
};

export default ProjectBanner;
