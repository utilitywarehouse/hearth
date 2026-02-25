import { Card, CardBannerContent, CardInteraction, Link } from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import React from 'react';

interface ProjectBannerProps {
  href: string;
  heading: string;
  description: string;
}

const ProjectBanner = ({ href, heading, description }: ProjectBannerProps) => {
  return (
    <li>
      <Card variant="emphasis" colorScheme="neutralStrong" direction="column" gap="200">
        <CardBannerContent heading={heading} description={description}>
          <CardInteraction>
            <Link href={href}>
              Learn more
              <ChevronRightSmallIcon />
            </Link>
          </CardInteraction>
        </CardBannerContent>
      </Card>
    </li>
  );
};

export default ProjectBanner;
