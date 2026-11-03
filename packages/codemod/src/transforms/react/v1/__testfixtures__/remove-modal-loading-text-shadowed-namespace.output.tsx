import * as H from '@utilitywarehouse/hearth-react';

const Local = ({ H }) => <H.Modal loadingText="Not the Hearth Modal">Content</H.Modal>;

const Component = () => (
  <H.Modal open loading loadingHeading="Fetching your details...">
    Content
  </H.Modal>
);

export default Component;
