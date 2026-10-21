import { Modal } from '@utilitywarehouse/hearth-react';

const Component = ({ props }) => (
  <Modal open loadingText="Fetching..." {...props}>
    Content
  </Modal>
);

export default Component;
