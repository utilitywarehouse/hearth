import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import type { ListItemProps } from './ListItem.props';

const componentName = 'ListItemContent';

export const ListItemContent: React.FC<ListItemProps> = ({ children, leadingIcon, helperText }) => {
  const Content = helperText ? (
    <Flex direction="column">
      <BodyText size="lg">{children}</BodyText>
      <HelperText>{helperText}</HelperText>
    </Flex>
  ) : (
    <BodyText size="lg">{children}</BodyText>
  );
  return (
    <>
      {leadingIcon ? (
        <Flex direction="row" gap="150">
          {leadingIcon} {Content}
        </Flex>
      ) : (
        Content
      )}
    </>
  );
};

ListItemContent.displayName = componentName;
