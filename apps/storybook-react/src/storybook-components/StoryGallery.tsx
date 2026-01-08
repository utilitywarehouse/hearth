import { BodyText, Flex } from '@utilitywarehouse/hearth-react';

interface StoryGalleryProps {
  /** The meta object from the story file (for default args) */
  meta: any;
  /** The object containing all exported stories (e.g., import * as Stories) */
  stories: Record<string, any>;
}

/**
 * A component that renders all stories from a story file in a gallery layout.
 * This is specifically designed for use with Chromatic visual testing to capture
 * multiple component variations in a single snapshot.
 */
export const StoryGallery = ({ meta, stories }: StoryGalleryProps) => {
  return (
    <Flex direction="column" gap="400">
      {Object.entries(stories).map(([name, story]) => (
        <Flex direction="column" gap="200" key={name}>
          <BodyText weight="bold">Story: {name}</BodyText>
          {story.render?.({ ...meta.args, ...story.args } as any, {} as any)}
        </Flex>
      ))}
    </Flex>
  );
};
