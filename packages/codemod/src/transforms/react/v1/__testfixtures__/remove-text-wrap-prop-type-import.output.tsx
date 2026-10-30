import type { BodyText } from '@utilitywarehouse/hearth-react';
import { type BodyText as InlineBodyText } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
    <BodyText wrap="nowrap">Content</BodyText>
    <InlineBodyText wrap="nowrap">Content</InlineBodyText>
  </>
);

export default Component;
