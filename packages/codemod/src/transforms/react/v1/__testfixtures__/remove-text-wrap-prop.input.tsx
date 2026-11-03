// this is a comment at the beginning of the file
import * as React from 'react';
import { BodyText } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <div>
    <BodyText wrap="nowrap">Content</BodyText>
    <BodyText
      wrap="nowrap"
      textWrap="balance"
    >
      Content
    </BodyText>
    <BodyText size="lg">No wrap prop</BodyText>
  </div>
);

export default Component;
