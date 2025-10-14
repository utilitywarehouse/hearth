import * as React from 'react';

import { Description } from '@storybook/addon-docs/blocks';
import { Divider, Flex, Heading, Link } from '@utilitywarehouse/hearth-react';
import { OpenSmallIcon } from '@utilitywarehouse/hearth-react-icons';

interface DocsHeaderProps {
  componentName: string;
  figmaLink?: string;
  themeProviderRequired?: boolean;
  stories: React.ReactNode;
}

export const DocsHeader = ({ componentName, figmaLink, stories }: DocsHeaderProps) => {
  return (
    <Flex marginBottom="400" className="sb-unstyled" width="100%" direction="column" gap="400">
      <Flex width="100%" alignItems="center" justifyContent="between">
        <Heading as="h1" size="xl">
          {componentName}
        </Heading>
        <Flex gap="300">
          <Link href={`/?path=/story/stories-${componentName}`}>Stories</Link>
          <Link
            href={`https://github.com/utilitywarehouse/hearth/blob/main/packages/react/src/components/${componentName}`}
          >
            Source
            <OpenSmallIcon />
          </Link>
          {figmaLink ? (
            <Link href={figmaLink}>
              Design
              <OpenSmallIcon />
            </Link>
          ) : null}
        </Flex>
      </Flex>
      <Divider decorative />
      <Description of={stories} />
      <Divider decorative />
    </Flex>
  );
};
