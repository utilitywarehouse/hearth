import { Modal } from '@utilitywarehouse/hearth-react';

const Component = ({ props }) => (
  <Modal open loadingHeading="Fetching..." {...props}>
    Content
  </Modal>
);

export default Component;
