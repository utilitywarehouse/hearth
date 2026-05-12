import React from 'react';
import { Flex } from '../../components/Flex/Flex';
import { BodyText } from '../../components/BodyText/BodyText';
import type { FlexProps } from '../../components/Flex/Flex.props';

interface StoryGalleryProps {
  /** The meta object from the story file (for default args) */
  meta: any;
  /** The object containing all exported stories (e.g., import * as Stories) */
  stories: Record<string, any>;
  direction?: FlexProps['direction'];
}

/**
 * A component that renders all stories from a story file in a gallery layout.
 * This is specifically designed for use with Chromatic visual testing to capture
 * multiple component variations in a single snapshot.
 */
export const StoryGallery = ({ meta, stories, direction = 'column' }: StoryGalleryProps) => {
  return (
    <Flex direction={direction} gap="400" width="100%">
      {Object.entries(stories).map(([name, story]) => (
        <Flex direction="column" gap="200" key={name}>
          <BodyText weight="bold">Story: {name}</BodyText>
          {story.render?.({ ...meta.args, ...story.args } as any, {} as any)}
        </Flex>
      ))}
    </Flex>
  );
};
