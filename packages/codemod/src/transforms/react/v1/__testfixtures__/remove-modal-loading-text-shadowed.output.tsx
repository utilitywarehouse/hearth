import { Modal } from '@utilitywarehouse/hearth-react';

const Local = ({ Modal }) => (
  <Modal loadingText="Not the Hearth Modal">Content</Modal>
);

const Component = () => (
  <Modal open loading loadingHeading="Fetching your details...">
    Content
  </Modal>
);

export default Component;
