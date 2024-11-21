import * as React from 'react';

import { Unstyled, Description } from '@storybook/blocks';
import { Flex } from '../components/Flex/Flex';
import { Heading } from '../components/Heading/Heading';
import { Link } from '../components/Link/Link';

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
        <Heading variant="h1">{componentName}</Heading>
        <Flex gap="24px">
          <Link
            href={`https://github.com/utilitywarehouse/design-systems/blob/main/packages/web-ui/src/${componentName}.tsx`}
          >
            View on GitHub
          </Link>
          {figmaLink ? <Link href={figmaLink}>View on Figma</Link> : null}
        </Flex>
      </Flex>
      <Description of={stories} />
    </Flex>
  </Unstyled>
);
