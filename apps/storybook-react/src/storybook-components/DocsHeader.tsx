import * as React from 'react';

import { Unstyled, Description } from '@storybook/blocks';
import { Flex, Heading } from '@utilitywarehouse/hearth-react';

interface DocsHeaderProps {
  componentName: string;
  figmaLink?: string;
  themeProviderRequired?: boolean;
  stories: React.ReactNode;
}

export const DocsHeader = ({ componentName, figmaLink, stories }: DocsHeaderProps) => (
  <Unstyled>
    <Flex direction="column" gap="24px">
      <Flex width="100%" align="center" justify="space-between">
        <Heading size="lg">{componentName}</Heading>
        <Flex gap="24px">
          <a href={`/?path=/story/stories-${componentName}`}>Stories</a>
          <a
            href={`https://github.com/utilitywarehouse/hearth/blob/main/packages/react/src/components/${componentName}`}
          >
            Source
          </a>
          {figmaLink ? <a href={figmaLink}>Design</a> : null}
        </Flex>
      </Flex>
      <Description of={stories} />
    </Flex>
  </Unstyled>
);
