import { BodyText, Card, CardInteraction, Heading, Link } from '@utilitywarehouse/hearth-react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils';
import React from 'react';

interface ProjectBannerProps {
  to: string;
  heading: string;
  description: string;
}

export const ProjectBanner = ({ to, heading, description }: ProjectBannerProps) => {
  return (
    <li>
      <Card
        variant="emphasis"
        colorScheme="neutralSubtle"
        direction="column"
        gap="200"
        shadowColor="functional"
      >
        <Heading size="md">{heading}</Heading>
        <BodyText size="md">{description}</BodyText>
        <CardInteraction asChild>
          <Link asChild>
            <StorybookLink to={to}>
              Learn more
              <ChevronRightSmallIcon />
            </StorybookLink>
          </Link>
        </CardInteraction>
      </Card>
    </li>
  );
};
