import type { ReactNode } from 'react';
import { Flex } from '../../components/Flex/Flex';
import { BodyText } from '../../components/BodyText/BodyText';
import type { FlexProps } from '../../components/Flex/Flex.props';

interface StoryEntry {
  render?: (args: Record<string, unknown>, context: Record<string, unknown>) => ReactNode;
  args?: Record<string, unknown>;
}

interface StoryGalleryProps {
  /** The meta object from the story file (for default args) */
  meta: { args?: Record<string, unknown> };
  /** The object containing all exported stories (e.g., import * as Stories) */
  stories: Record<string, StoryEntry>;
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
          {story.render?.({ ...meta.args, ...story.args }, {})}
        </Flex>
      ))}
    </Flex>
  );
};
