import * as React from 'react';

import { Description } from '@storybook/blocks';
import { Flex } from '@utilitywarehouse/hearth-react';

interface DocsHeaderProps {
  componentName: string;
  figmaLink?: string;
  themeProviderRequired?: boolean;
  stories: React.ReactNode;
}

export const DocsHeader = ({ componentName, figmaLink, stories }: DocsHeaderProps) => {
  return (
    <div>
      <Flex width="100%" alignItems="center" justifyContent="between">
        <h1>{componentName}</h1>
        <Flex gap="300">
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
    </div>
  );
};
